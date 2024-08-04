import { UUID } from "crypto";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class StepExecution {
  constructor(
    public id: UUID,
    public step: WorkflowDefinitionStep,
    public result: any,
    public beginAt: number,
    public duration: number,
    public isCompleted: boolean,
  ) {}

  public async run(prevData: any) {
    this.beginAt = Date.now();
    this.result = await this.step.operation.execute(this.step.data, prevData);
    this.duration = Date.now() - this.beginAt;
    this.isCompleted = true;
  }
}
