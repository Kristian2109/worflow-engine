import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "../../workflowDefinition/definitions/WorkflowDefinition";
import WorkflowExecutor from "../../workflowExecution/executors/WorkflowExecutor";
import WorkflowExecutionRepository from "../interfaces/WorkflowExecutionRepository";
import ExecutionState from "../../workflowExecution/state/ExecutionState";
import { ExecutionStatus } from "../../workflowExecution/state/ExecutionStatus";

export default class WorkflowExecutionMockRepository implements WorkflowExecutionRepository {
  private executions: Map<UUID, WorkflowExecutor> = new Map();
  async createExecution(definition: WorkflowDefinition): Promise<WorkflowExecutor> {
    const newExecution = new WorkflowExecutor(
      randomUUID(), 
      definition, 
      new ExecutionState(randomUUID(), definition.id, new Map(), ExecutionStatus.Executing),
    )
    this.executions.set(newExecution.id, newExecution);
    return newExecution;
  }
  async updateExecution(execution: WorkflowExecutor): Promise<WorkflowExecutor> {
    this.executions.set(execution.id, execution);
    return execution;
  }
  async getExecutionById(id: UUID): Promise<WorkflowExecutor> {
    const execution = this.executions.get(id);
    if (!execution) {
      throw new Error("No such execution!");
    }
    return execution;
  }
}
