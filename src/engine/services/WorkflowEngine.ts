import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../repositories/WorkflowDefinitionRepository";
import WorkflowExecutionRepository from "../repositories/WorkflowExecutionRepository";
import WorkflowExecution from "../entities/WorkflowExecution";
import StepExecution from "../entities/StepExecution";

export default class WorkflowEngine {
  static readonly EXECUTION_TIMEOUT = 40 * 1000;

  constructor(
    private workflowDefinitionRepository: WorkflowDefinitionRepository,
    private workflowExecutionRepository: WorkflowExecutionRepository,
  ) {}

  public async startWorkflowExecution(workflowId: UUID): Promise<{ workflowExecutionId: UUID }> {
    const workflowDefinition = await this.workflowDefinitionRepository.getWorkflowDefinitionById(workflowId);
    const executionId = await this.workflowExecutionRepository.createExecution(workflowDefinition);

    this.executeWorkflow(executionId);

    return {
      workflowExecutionId: executionId,
    }
  }

  public async executeWorkflow(workflowExecutionId: UUID) {
    const workflowExecution = await this.workflowExecutionRepository.getExecutionById(workflowExecutionId);
    workflowExecution.firstStepExecutions.forEach(firstStep => {
      this.executeStep(workflowExecution, firstStep, undefined);
    });
  }

  public async executeStep(workflowExecution: WorkflowExecution, step: StepExecution, previousStepResult: any) {
    await step.run(previousStepResult);

    for (const childStepId of step.step.nextSteps) {
      const childStep = workflowExecution.executionStepsByDefinitionId.get(childStepId);
      if (!childStep) {
        throw new Error(`No step found with id ${childStepId}`);
      }
      this.executeStep(workflowExecution, childStep, step.result);
    }
  }
}
