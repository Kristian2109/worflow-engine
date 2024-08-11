import { UUID } from "crypto";
import WorkflowDefinition from "../definitions/WorkflowDefinition";

export default interface WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition>;
}