import { UUID } from "crypto";
import WorkflowDefinitionStep from "../definitions/WorkflowDefinitionStep";
import ConditionParser from "../conditions/ConditionParser";
import { ExecutionStatus } from "./ExecutionStatus";

export default class StepExecutor {
  public childSteps: StepExecutor[] = [];
  public parentSteps: StepExecutor[] = [];
  private conditionFactory: ConditionParser;

  constructor(
    public id: UUID,
    public definition: WorkflowDefinitionStep,
    public result: any,
    public beginAt: number,
    public duration: number,
    public status: ExecutionStatus = ExecutionStatus.Pending,
  ) {
    this.conditionFactory = new ConditionParser();
  }

  public async run(prevData: any) {
    this.beginAt = Date.now();
    this.result = await this.definition.operation.execute(this.definition.data, prevData);
    this.duration = Date.now() - this.beginAt;
    this.status = ExecutionStatus.Succeeded;
  }

  public async execute(prevData: any) {
    if (this.checkCondition(prevData)) {
      await this.run(prevData);
      for (const childStep of this.childSteps) {
        childStep.execute(this.result);
      }
    }
  }

  private checkCondition(prevData: any) {
    if (this.definition.conditionExpression) {
      const condition = this.conditionFactory.parse(prevData, this.definition.conditionExpression);
      return condition.evaluate();
    }
    return true;
  }
}
