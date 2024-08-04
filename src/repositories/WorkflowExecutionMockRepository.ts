import { UUID } from "crypto";
import WorkflowDefinition from "../engine/entities/WorkflowDefinition";
import WorkflowExecution from "../engine/entities/WorkflowExecution";
import WorkflowExecutionRepository from "../engine/repositories/WorkflowExecutionRepository";

export default class WorkflowExecutionMockRepository implements WorkflowExecutionRepository {
  createExecution(definition: WorkflowDefinition): Promise<WorkflowExecution> {
    throw new Error("Method not implemented.");
  }
  updateExecution(execution: WorkflowExecution): Promise<WorkflowExecution> {
    throw new Error("Method not implemented.");
  }
  getExecutionById(id: UUID): Promise<WorkflowExecution> {
    throw new Error("Method not implemented.");
  }
}
