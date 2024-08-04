import { UUID } from "crypto";
import WorkflowDefinitionRepository from "./repositories/WorkflowDefinitionRepository";

export default class WorkflowEngine {
  constructor(
    private workflowDefinitionRepository: WorkflowDefinitionRepository,
  ) {}

  public executeWorkflow(workflowId: UUID): { workflowExecutionId: UUID } {
    return {
      workflowExecutionId: workflowId
    };
  }
}
