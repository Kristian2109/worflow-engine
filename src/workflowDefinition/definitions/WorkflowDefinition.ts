import { UUID } from "crypto";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class WorkflowDefinition {
  constructor(
    private _id: UUID,
    private _name: string,
    private steps: Map<UUID, WorkflowDefinitionStep>,
    private firstStepIds: UUID[],
  ) {}

  public getStepById(id: UUID) {
    if (!this.steps.has(id)) {
      throw new Error(`No step with id ${id} in workflow with id ${id}`);
    }
    return this.steps.get(id)!;
  }

  public get getFirstStepIds() {
    return this.firstStepIds;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get id(): UUID {
    return this._id;
  }
}
