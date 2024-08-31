import { UUID } from "crypto";
import StepExecutor from "../executors/StepExecutor";

export type OperationInput =  { payload: string; stepDefinitionId?: UUID}

export default abstract class Operation {
  abstract NAME: string;
  protected inputs: OperationInput[];
  private inputStepExecutors?: Map<UUID, StepExecutor>;

  constructor(inputs: OperationInput[]) {
    this.inputs = inputs;
  }

  abstract execute(): any;

  abstract getNode(stepResult: string, node: string): string;

  public getInputStepIds() {
    return this.inputs
      .filter(({ stepDefinitionId }) => stepDefinitionId)
      .map(input => input.stepDefinitionId!);
  }

  public addReferenceToSteps(stepsByDefinitionId: Map<UUID, StepExecutor>) {
    this.inputStepExecutors = stepsByDefinitionId;
  }

  protected getPayloadForInput(input: OperationInput): string {
    if (!input.stepDefinitionId || !this.inputStepExecutors) {
      return input.payload;
    }
    const stepInputExecution = this.inputStepExecutors.get(input.stepDefinitionId);
    if (!stepInputExecution) {
      throw new Error("No such step input");
    }
    if (input.payload === stepInputExecution.definition.id) {
      return stepInputExecution.result;
    }
    return stepInputExecution.definition.operation.getNode(stepInputExecution.result, input.payload);
  }
}
