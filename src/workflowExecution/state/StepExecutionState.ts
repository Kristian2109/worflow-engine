import { UUID } from "crypto";

export default class StepExecutionState {
  public get operationResult(): any {
    return this._operationResult;
  }
  public set operationResult(value: any) {
    this._operationResult = value;
  }
  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    this._duration = value;
  }
  public get beginAt(): number {
    return this._beginAt;
  }
  public set beginAt(value: number) {
    this._beginAt = value;
  }
  public get stepExecutionId(): UUID {
    return this._stepExecutionId;
  }
  public get stepDefinitionId(): UUID {
    return this._stepDefinitionId;
  }
  public get id(): UUID {
    return this._id;
  }
  constructor(
    private readonly _id: UUID,
    private readonly _stepDefinitionId: UUID,
    private readonly _stepExecutionId: UUID,
    private _beginAt: number,
    private _duration: number,
    private _operationResult: any,
  ) {}
};
