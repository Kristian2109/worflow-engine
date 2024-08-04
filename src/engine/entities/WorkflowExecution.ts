import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "./WorkflowDefinition";
import StepExecution from "./StepExecution";

export default class WorkflowExecution {
  private steps: StepExecution[];

  constructor(
    public id: UUID,
    public workflowDefinition: WorkflowDefinition
  ) {
    this.steps = workflowDefinition.steps.map(step => {
      return new StepExecution(randomUUID(), step, undefined, 0, 0, false);
    })
  }

  getStepsInExecutionOrder() {
    return this.steps.sort((a, b) => a.step.stepOrder - b.step.stepOrder);
  }
}
