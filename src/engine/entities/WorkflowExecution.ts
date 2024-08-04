import { UUID } from "crypto";
import WorkflowDefinition from "./WorkflowDefinition";
import StepExecution from "./StepExecution";
import StepResult from "./StepResult";

export default class WorkflowExecution {
  constructor(
    public id: UUID,
    public workflowDefinition: WorkflowDefinition,
    public steps: StepExecution[],
  ) {}

  getStepsInExecutionOrder() {
    return this.steps.sort((a, b) => a.step.stepOrder - b.step.stepOrder);
  }
}
