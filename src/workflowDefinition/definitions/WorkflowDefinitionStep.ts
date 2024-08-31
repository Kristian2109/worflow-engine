import { UUID } from "crypto";
import Operation from "../../workflowExecution/operations/Operation";

export default class WorkflowDefinitionStep {
  public get conditionExpression(): string | undefined {
    return this._conditionExpression;
  }
  public set conditionExpression(value: string) {
    this._conditionExpression = value;
  }
  public get nextSteps(): UUID[] {
    return this._nextSteps;
  }
  public get operation(): Operation {
    return this._operation;
  }
  public set operation(value: Operation) {
    this._operation = value;
  }
  public get id(): UUID {
    return this._id;
  }
  public set id(value: UUID) {
    this._id = value;
  }
  constructor (
    private _id: UUID,
    private _operation: Operation,
    private _nextSteps: UUID[],
    private _conditionExpression?: string,
  ) {}
}