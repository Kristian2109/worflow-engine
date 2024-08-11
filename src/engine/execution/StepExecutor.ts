import { UUID } from "crypto";
import WorkflowDefinitionStep from "../definitions/WorkflowDefinitionStep";
import ConditionFactory from "../conditions/ConditionFactory";

export default class StepExecutor {
  public nextSteps: StepExecutor[] = [];
  private conditionFactory: ConditionFactory;

  constructor(
    public id: UUID,
    public definition: WorkflowDefinitionStep,
    public result: any,
    public beginAt: number,
    public duration: number,
    public isCompleted: boolean,
  ) {
    this.conditionFactory = new ConditionFactory();
  }

  public async run(prevData: any) {
    this.beginAt = Date.now();
    this.result = await this.definition.operation.execute(this.definition.data, prevData);
    this.duration = Date.now() - this.beginAt;
    this.isCompleted = true;
  }

  public async execute(prevData: any) {
    if (this.definition.conditionExpression) {
      const condition = this.conditionFactory.createCondition(prevData, this.definition.conditionExpression);
      if (!condition.evaluate()) {
        console.log(`Step ${this.definition.id} didn't passed because of condition!`)
        return;
      }
    }
    await this.run(prevData);
    for (const nextStep of this.nextSteps) {
      nextStep.execute(this.result);
    }
  }
}
