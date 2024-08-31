import { UUID } from "crypto";

export default class ExecutionState {
  public get workflowDefinitionId(): UUID {
    return this._workflowDefinitionId;
  }
  public get id(): UUID {
    return this._id;
  }
  constructor(
    private readonly _id: UUID,
    private readonly _workflowDefinitionId: UUID,
  ) {}
}
