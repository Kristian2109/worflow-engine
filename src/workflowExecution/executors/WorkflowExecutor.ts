import StepExecutor from "./StepExecutor";
import ExecutionState from "../state/ExecutionState";
import { ExecutionStatus } from "../state/ExecutionStatus";
import ExecutionStateRepository from "../../repositories/interfaces/ExecutionStateRepository";

export default class WorkflowExecutor {
  constructor(
    private _state: ExecutionState,
    private _stepExecutors: StepExecutor[],
    private _firstStepIndexes: number[],
    private _stateRepository: ExecutionStateRepository,
  ) {}

  public async execute() {
    this._state.status = ExecutionStatus.Executing;
    const executionPromises = this._firstStepIndexes.map(index => this.executeStep(index));
    await Promise.all(executionPromises);
    this._state.status = ExecutionStatus.Succeeded;
    await this._stateRepository.update(this._state);
  }

  private async executeStep(index: number) {
    const currentStep = this._stepExecutors[index];
    await currentStep.executeOperation();
    await this._stateRepository.updateStepState(this._state.id, currentStep.state);
    for (const childIndex of currentStep.nextStepIds) {
      this.executeStep(childIndex);
    }
  }
}
