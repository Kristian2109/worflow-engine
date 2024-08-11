import { UUID } from "crypto";
import Operation from "./Operation";
import Condition from "../conditions/Condition";

export default class WorkflowDefinitionStep {
  constructor (
    public id: UUID,
    public operation: Operation,
    public data: any,
    public nextSteps: UUID[],
    public condition?: Condition,
  ) {}
}