import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../repositories/interfaces/WorkflowDefinitionRepository";
import WorkflowExecutionRepository from "../repositories/interfaces/WorkflowExecutionRepository";

export default class WorkflowEngine {
  static readonly EXECUTION_TIMEOUT = 40 * 1000;

  constructor(
    private workflowDefinitionRepository: WorkflowDefinitionRepository,
    private workflowExecutionRepository: WorkflowExecutionRepository,
  ) {}

  public async startWorkflowExecution(workflowId: UUID): Promise<{ workflowExecutionId: UUID }> {
    const workflowDefinition = await this.workflowDefinitionRepository.getWorkflowDefinitionById(workflowId);
    const workflowExecution = await this.workflowExecutionRepository.createExecution(workflowDefinition);

    workflowExecution.execute();

    return {
      workflowExecutionId: workflowExecution.id,
    }
  }
}
