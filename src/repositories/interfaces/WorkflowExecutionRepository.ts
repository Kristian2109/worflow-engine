import { UUID } from "crypto";
import WorkflowExecutor from "../../workflowExecution/execution/WorkflowExecutor";
import WorkflowDefinition from "../../workflowDefinition/definitions/WorkflowDefinition";

export default interface WorkflowExecutionRepository {
  createExecution(definition: WorkflowDefinition): Promise<WorkflowExecutor>;
  updateExecution(execution: WorkflowExecutor): Promise<WorkflowExecutor>;
  getExecutionById(id: UUID): Promise<WorkflowExecutor>;
}
