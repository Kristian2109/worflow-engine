export default class ExecutionState {
  public get workflowDefinitionId(): number {
    return this._workflowDefinitionId;
  }
  public get id(): number {
    return this._id;
  }
  constructor(
    private readonly _id: number,
    private readonly _workflowDefinitionId: number,
  ) {}
}
