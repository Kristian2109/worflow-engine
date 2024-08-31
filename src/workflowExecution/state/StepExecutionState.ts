import { UUID } from "crypto";
import { StepExecutionStatus } from "./StepExecutionStatus";

export default class StepExecutionState {
  public get status(): StepExecutionStatus {
    return this._status;
  }
  public set status(value: StepExecutionStatus) {
    this._status = value;
  }
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
    private _status: StepExecutionStatus,
  ) {}
};
