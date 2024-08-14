import { UUID } from "crypto";
import StepExecutor from "../execution/StepExecutor";
import { get } from "lodash";

export type OperationInput =  { payload: string; stepDefinitionId?: UUID}

export default abstract class Operation {
  abstract NAME: string;
  protected inputs: OperationInput[];
  private inputStepExecutors: Map<UUID, StepExecutor> = new Map();
  constructor(inputs: OperationInput[]) {
    this.inputs = inputs;
  }
  abstract execute(): any;

  public getInputStepIds() {
    return this.inputs
      .filter(({ stepDefinitionId }) => stepDefinitionId)
      .map(input => input.stepDefinitionId!);
  }

  public addStepExecutor(stepDefinitionId: UUID, stepExecutor: StepExecutor) {
    this.inputStepExecutors.set(stepDefinitionId, stepExecutor);
  }

  protected getPayloadForInput(input: OperationInput): string {
    if (!input.stepDefinitionId) {
      return input.payload;
    }
    const stepInputExecution = this.inputStepExecutors.get(input.stepDefinitionId);
    if (!stepInputExecution) {
      throw new Error("No such step input");
    }
    if (input.payload === stepInputExecution.definition.id) {
      return stepInputExecution.result;
    }
    return get({ a: stepInputExecution.result }, `a.${input.payload}`);
  }
}
