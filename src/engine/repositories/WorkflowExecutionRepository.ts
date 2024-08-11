import { UUID } from "crypto";
import WorkflowExecutor from "../entities/WorkflowExecutor";
import WorkflowDefinition from "../entities/WorkflowDefinition";

export default interface WorkflowExecutionRepository {
  createExecution(definition: WorkflowDefinition): Promise<WorkflowExecutor>;
  updateExecution(execution: WorkflowExecutor): Promise<WorkflowExecutor>;
  getExecutionById(id: UUID): Promise<WorkflowExecutor>;
}
