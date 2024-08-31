import { UUID } from "crypto";
import WorkflowDefinition from "../../workflowDefinition/definitions/WorkflowDefinition";

export default interface WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition>;
}