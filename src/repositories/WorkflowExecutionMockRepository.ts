import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "../engine/entities/WorkflowDefinition";
import WorkflowExecutor from "../engine/entities/WorkflowExecutor";
import WorkflowExecutionRepository from "../engine/repositories/WorkflowExecutionRepository";

export default class WorkflowExecutionMockRepository implements WorkflowExecutionRepository {
  private executions: Map<UUID, WorkflowExecutor> = new Map();
  async createExecution(definition: WorkflowDefinition): Promise<WorkflowExecutor> {
    const newExecution = new WorkflowExecutor(randomUUID(), definition)
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
