import { UUID } from "crypto";
import StepExecutionState from "./StepExecutionState";
import { ExecutionStatus } from "./ExecutionStatus";

export default class ExecutionState {
  public get status(): ExecutionStatus {
    return this._status;
  }
  public set status(value: ExecutionStatus) {
    this._status = value;
  }
  public get stepStates(): Map<UUID, StepExecutionState> {
    return this._stepStates;
  }
  public get workflowDefinitionId(): UUID {
    return this._workflowDefinitionId;
  }
  public get id(): UUID {
    return this._id;
  }
  constructor(
    private readonly _id: UUID,
    private readonly _workflowDefinitionId: UUID,
    private readonly _stepStates: Map<UUID, StepExecutionState>,
    private _status: ExecutionStatus,
  ) {}

  public getStepStateById(id: UUID): StepExecutionState {
    const found = this._stepStates.get(id);
    if (!found) {
      throw new Error(`Step with ${id} not set`)
    }
    return found;
  }
}
