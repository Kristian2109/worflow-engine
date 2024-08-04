import { UUID } from "crypto";

export default interface WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<any>;
}