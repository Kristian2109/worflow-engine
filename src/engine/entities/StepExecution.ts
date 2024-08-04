import { UUID } from "crypto";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class StepExecution {
  constructor(
    public id: UUID,
    public step: WorkflowDefinitionStep,
    public result: any,
    public beginAt: Date,
    public duration: number,
    public isCompleted: boolean,
  ) {}
}
