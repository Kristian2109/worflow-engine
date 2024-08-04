import { randomUUID, UUID } from "crypto";
import { v4 } from 'uuid'
import WorkflowDefinition from "../engine/entities/WorkflowDefinition";
import WorkflowExecution from "../engine/entities/WorkflowExecution";
import WorkflowExecutionRepository from "../engine/repositories/WorkflowExecutionRepository";

export default class WorkflowExecutionMockRepository implements WorkflowExecutionRepository {
  createExecution(definition: WorkflowDefinition): Promise<WorkflowExecution> {
    return Promise.resolve(new WorkflowExecution(randomUUID(), definition));
  }
  updateExecution(execution: WorkflowExecution): Promise<WorkflowExecution> {
    return Promise.resolve(execution);
  }
  getExecutionById(id: UUID): Promise<WorkflowExecution> {
    throw new Error("Method not implemented.");
  }
}
