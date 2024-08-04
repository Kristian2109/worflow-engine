import { UUID } from "crypto";
import WorkflowExecution from "../entities/WorkflowExecution";
import WorkflowDefinition from "../entities/WorkflowDefinition";

export default interface WorkflowExecutionRepository {
  createExecution(definition: WorkflowDefinition): Promise<WorkflowExecution>;
  updateExecution(execution: WorkflowExecution): Promise<WorkflowExecution>;
  getExecutionById(id: UUID): Promise<WorkflowExecution>;
}
