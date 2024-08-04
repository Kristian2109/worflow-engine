import { UUID } from "crypto";
import WorkflowDefinition from "../entities/WorkflowDefinition";

export default interface WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition>;
}