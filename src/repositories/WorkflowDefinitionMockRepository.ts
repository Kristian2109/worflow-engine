import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../engine/repositories/WorkflowDefinitionRepository";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<any> {
    throw new Error("Method not implemented.");
  }
}