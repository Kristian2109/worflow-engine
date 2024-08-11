import { UUID } from "crypto";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class WorkflowDefinition {
  constructor(
    public id: UUID,
    public name: string,
    public steps: Map<UUID, WorkflowDefinitionStep>,
    public firstStepId: UUID,
  ) {}
}
