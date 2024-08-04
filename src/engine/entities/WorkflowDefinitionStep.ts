import { UUID } from "crypto";
import Operation from "./Operation";

export default class WorkflowDefinitionStep {
  constructor (
    public id: UUID,
    public operation: Operation,
    public stepOrder: number,
    public data: any,
  ) {}
}