import StepExecutor from "./StepExecutor";
import ExecutionState from "../state/ExecutionState";
import { ExecutionStatus } from "../state/ExecutionStatus";
import WorkflowExecutionRepository from "../../repositories/interfaces/WorkflowExecutionRepository";

export default class WorkflowExecutor {
  constructor(
    private _state: ExecutionState,
    private _stepExecutors: StepExecutor[],
    private _firstStepIndexes: number[],
    private _stateRepository: WorkflowExecutionRepository,
  ) {}

  public async execute() {
    this._state.status = ExecutionStatus.Executing;
    const executionPromises = this._firstStepIndexes.map(index => this.executeStep(index));
    await Promise.all(executionPromises);
    this._state.status = ExecutionStatus.Succeeded;
  }

  private async executeStep(index: number) {
    const currentStep = this._stepExecutors[index];
    await currentStep.executeOperation();
    for (const childIndex of currentStep.nextStepIds) {
      this.executeStep(childIndex);
    }
  }
}
