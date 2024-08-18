import { UUID } from "crypto";
import WorkflowDefinitionStep from "../definitions/WorkflowDefinitionStep";
import ConditionParser from "../conditions/ConditionParser";
import { ExecutionStatus } from "./ExecutionStatus";

export default class StepExecutor {
  public childSteps: StepExecutor[] = [];
  public parentSteps: StepExecutor[] = [];

  constructor(
    public id: UUID,
    public definition: WorkflowDefinitionStep,
    public result: any,
    public beginAt: number,
    public duration: number,
    public status: ExecutionStatus = ExecutionStatus.Pending,
  ) {}

  public async execute() {
    await this.executeOperation();
    for (const childStep of this.childSteps) {
      // To Do: Add executing based on condition and execution status
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

  private checkCondition() {
    if (this.definition.conditionExpression) {
      return false;
    }
    return true;
  }
}
