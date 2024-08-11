import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "./WorkflowDefinition";
import StepExecution from "./StepExecution";
import WorkflowDefinitionStep from "./WorkflowDefinitionStep";

export default class WorkflowExecution {
  public executionSteps: Map<UUID, StepExecution>;

  constructor(
    public id: UUID,
    public workflowDefinition: WorkflowDefinition,
  ) {
    this.executionSteps = new Map<UUID, StepExecution>;
    const firstStepExecution = new StepExecution(randomUUID(), workflowDefinition.getFirstStep(), undefined, 0, 0, false);
    this.initChildren(workflowDefinition.getFirstStep(), firstStepExecution);

    // workflowDefinition.steps.forEach(step => {
    //   const stepExecutionId = randomUUID();
    //   this.executionSteps.set(stepExecutionId, new StepExecution(stepExecutionId, step, undefined, 0, 0, false));
    //   nextDefinitionStepIdsPerExecutionId.set(stepExecutionId, step.nextSteps);
    // });

    // nextDefinitionStepIdsPerExecutionId.forEach((definitionStepIds, executionId) => {
    //   const executionStep = this.executionSteps.get(executionId);
    //   definitionStepIds.forEach(definitionId => {
    //     const nextExecutionStep = Array.from(this.executionSteps.values()).find(execStep => execStep.step.id === definitionId)
    //     executionStep?.nextSteps.push(nextExecutionStep!);
    //   });
    // });
  }

  public initChildren(parentDefinition: WorkflowDefinitionStep, parentExecution: StepExecution) {
    for (const childId of parentDefinition.nextSteps) {
      const childExecutionId = randomUUID();
      const childDefinition = this.workflowDefinition.steps.get(childId)!;
      const childExecution = new StepExecution(childExecutionId, childDefinition, undefined, 0, 0, false);
      this.executionSteps.set(childExecutionId, childExecution);

      this.initChildren(childDefinition, childExecution);
      parentExecution.nextSteps.push(childExecution)
    }
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
