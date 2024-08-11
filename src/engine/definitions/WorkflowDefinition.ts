import { UUID } from "crypto";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class WorkflowDefinition {
  constructor(
    public id: UUID,
    public name: string,
    public steps: Map<UUID, WorkflowDefinitionStep>,
    public firstStepIds: UUID[],
  ) {}

  public getStepById(id: UUID) {
    if (!this.steps.has(id)) {
      throw new Error(`No step with id ${id} in workflow with id ${id}`);
    }
    return this.steps.get(id)!;
  }
}
