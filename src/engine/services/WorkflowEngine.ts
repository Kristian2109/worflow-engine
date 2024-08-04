import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../repositories/WorkflowDefinitionRepository";
import WorkflowExecutionRepository from "../repositories/WorkflowExecutionRepository";
import StepExecutor from "./StepExecutor";
import StepExecution from "../entities/StepExecution";
import WorkflowExecution from "../entities/WorkflowExecution";

export default class WorkflowEngine {
  static readonly EXECUTION_TIMEOUT = 40 * 1000;

  constructor(
    private workflowDefinitionRepository: WorkflowDefinitionRepository,
    private workflowExecutionRepository: WorkflowExecutionRepository,
    private stepExecutor: StepExecutor,
  ) {}

  public async startWorkflowExecution(workflowId: UUID): Promise<{ workflowExecutionId: UUID }> {
    const workflowDefinition = await this.workflowDefinitionRepository.getWorkflowDefinitionById(workflowId);
    const workflowExecution = await this.workflowExecutionRepository.createExecution(workflowDefinition);

    this.executeWorkflow(workflowExecution);

    return {
      workflowExecutionId: workflowExecution.id,
    }
  }

  public async executeWorkflow(workflowExecution: WorkflowExecution) {
    const steps = workflowExecution.getStepsInExecutionOrder();
    let previousStepResult = undefined;

    for (let i = 0; i < steps.length; i++) {
      await this.stepExecutor.executeStep(steps[i], previousStepResult);
      previousStepResult = workflowExecution.steps[i].result;
      workflowExecution = await this.workflowExecutionRepository.updateExecution(workflowExecution);
    }
  }
}
