import { UUID } from "crypto";
import Operation from "../operations/Operation";

export default class WorkflowDefinitionStep {
  constructor (
    public id: UUID,
    public operation: Operation,
    public nextSteps: UUID[],
    public conditionExpression?: string,
  ) {}
}