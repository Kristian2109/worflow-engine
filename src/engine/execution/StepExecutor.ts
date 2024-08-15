import { UUID } from "crypto";
import WorkflowDefinitionStep from "../definitions/WorkflowDefinitionStep";
import ConditionParser from "../conditions/ConditionParser";
import { ExecutionStatus } from "./ExecutionStatus";
import { sleep } from "../utils/testing";

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

  public async execute() {
    await this.waitForParentsToComplete();
    await this.executeOperation();
    for (const childStep of this.childSteps) {
      childStep.execute();
    }
  }

  private async executeOperation() {
    this.status = ExecutionStatus.Executing;
    this.beginAt = Date.now();
    this.result = await this.definition.operation.execute();
    this.duration = Date.now() - this.beginAt;
    this.status = ExecutionStatus.Succeeded;
  }

  private async waitForParentsToComplete() {
    while (this.parentSteps.some(step => step.status !== ExecutionStatus.Succeeded)) {
      await sleep(100);
    }
  }

  // private checkCondition() {
  //   if (this.definition.conditionExpression) {
  //     const condition = this.conditionFactory.parse(this.getParentStepResults(), this.definition.conditionExpression);
  //     return condition.evaluate();
  //   }
  //   return true;
  // }
}
