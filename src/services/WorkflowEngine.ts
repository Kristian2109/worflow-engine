import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../repositories/interfaces/WorkflowDefinitionRepository";
import ExecutionStateRepository from "../repositories/interfaces/ExecutionStateRepository";

export default class WorkflowEngine {
  static readonly EXECUTION_TIMEOUT = 40 * 1000;

  constructor(
    private workflowDefinitionRepository: WorkflowDefinitionRepository,
    private workflowExecutionRepository: ExecutionStateRepository,
  ) {}

  public async startWorkflowExecution(workflowId: UUID): Promise<{ workflowExecutionId: UUID }> {
    const workflowDefinition = await this.workflowDefinitionRepository.getWorkflowDefinitionById(workflowId);
    const workflowExecution = await this.workflowExecutionRepository.create(workflowDefinition);

    workflowExecution.execute();

    return {
      workflowExecutionId: workflowExecution.id,
    }
  }
}
