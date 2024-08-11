import { randomUUID, UUID } from "crypto";
import { v4 } from 'uuid'
import WorkflowDefinition from "../engine/entities/WorkflowDefinition";
import WorkflowExecution from "../engine/entities/WorkflowExecution";
import WorkflowExecutionRepository from "../engine/repositories/WorkflowExecutionRepository";

export default class WorkflowExecutionMockRepository implements WorkflowExecutionRepository {
  private executions: Map<UUID, WorkflowExecution> = new Map;
  async createExecution(definition: WorkflowDefinition): Promise<UUID> {
    const id = randomUUID();
    this.executions.set(id, new WorkflowExecution(id, definition));
    return id;
  }
  async updateExecution(execution: WorkflowExecution): Promise<WorkflowExecution> {
    this.executions.set(execution.id, execution);
    return execution;
  }
  async getExecutionById(id: UUID): Promise<WorkflowExecution> {
    const execution = this.executions.get(id);
    if (!execution) {
      throw new Error("No such execution!");
    }
    return execution;
  }
}
