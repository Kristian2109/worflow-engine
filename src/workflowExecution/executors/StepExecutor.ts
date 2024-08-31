import { UUID } from "crypto";
import Operation from "../operations/Operation";
import Condition from "../conditions/Condition";
import StepExecutionState from "../state/StepExecutionState";
import { StepExecutionStatus } from "../state/StepExecutionStatus";

export default class StepExecutor {
  public get state(): StepExecutionState {
    return this._state;
  }
  public get condition(): Condition {
    return this._condition;
  }
  public get nextStepIds(): UUID[] {
    return this._nextStepIds;
  }
  constructor(
    private readonly _nextStepIds: UUID[],
    private readonly _condition: Condition,
    private readonly _operation: Operation,
    private readonly _state: StepExecutionState,
  ) {}

 public async executeOperation() {
    this._state.status = StepExecutionStatus.Executing;
    this._state.beginAt = Date.now();
    this._state.operationResult = await this._operation.execute();
    this._state.duration = Date.now() - this._state.beginAt;
    this._state.status = StepExecutionStatus.Succeeded;
  }
}
