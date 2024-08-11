import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "./WorkflowDefinition";
import StepExecution from "./StepExecution";

export default class WorkflowExecution {
  public executionSteps: Map<UUID, StepExecution>;

  constructor(
    public id: UUID,
    public workflowDefinition: WorkflowDefinition,
  ) {
    this.executionSteps = new Map<UUID, StepExecution>;
    workflowDefinition.steps.forEach(step => {
      const stepExecutionId = randomUUID();
      this.executionSteps.set(stepExecutionId, new StepExecution(stepExecutionId, step, undefined, 0, 0, false));
    });
  }

  public getFirstStep() {
    const firstStep = Array.from(this.executionSteps.values()).find(step => step.step.id === this.workflowDefinition.firstStepId);
    if (!firstStep) {
      throw new Error("No such step");
    }
    return firstStep;
  }

  public *generateNextSteps() {
    for (const executionSteps of this.executionSteps) {
      const nextStepdIds = executionSteps[1].step.nextSteps;
      yield nextStepdIds.map(id =>  Array.from(this.executionSteps.values()).find(st =>st.step.id === id));
    }
  }
}
