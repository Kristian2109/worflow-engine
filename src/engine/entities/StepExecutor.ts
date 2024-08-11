import { UUID } from "crypto";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class StepExecutor {
  public nextSteps: StepExecutor[] = [];

  constructor(
    public id: UUID,
    public definition: WorkflowDefinitionStep,
    public result: any,
    public beginAt: number,
    public duration: number,
    public isCompleted: boolean,
  ) {}

  public async run(prevData: any) {
    this.beginAt = Date.now();
    this.result = await this.definition.operation.execute(this.definition.data, prevData);
    this.duration = Date.now() - this.beginAt;
    this.isCompleted = true;
  }

  public async execute(prevData: any) {
    await this.run(prevData);
    for (const nextStep of this.nextSteps) {
      nextStep.execute(this.result);
    }
  }
}
