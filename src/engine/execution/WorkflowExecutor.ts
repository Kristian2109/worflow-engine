import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "../definitions/WorkflowDefinition";
import StepExecutor from "./StepExecutor";
import WorkflowDefinitionStep from "../definitions/WorkflowDefinitionStep";

export default class WorkflowExecutor {
  public executionStepsByDefinitionId: Map<UUID, StepExecutor> = new Map();
  public firstStepExecutions: StepExecutor[] = [];

  constructor(
    public id: UUID,
    public workflowDefinition: WorkflowDefinition,
  ) {
    workflowDefinition.firstStepIds.forEach((id) => {
      const firstDefintionStep = workflowDefinition.getStepById(id);
      const firstExecutionStep = new StepExecutor(randomUUID(), firstDefintionStep, undefined, 0, 0);
      this.firstStepExecutions.push(firstExecutionStep);
      this.executionStepsByDefinitionId.set(id, firstExecutionStep);
      this.initChildren(workflowDefinition.getStepById(id), firstExecutionStep);
    });
  }

  public initChildren(parentDefinition: WorkflowDefinitionStep, parentExecution: StepExecutor) {
    for (const definitionChildId of parentDefinition.nextSteps) {
      let childExecution = this.executionStepsByDefinitionId.get(definitionChildId);
      if (!childExecution) {
        const childExecutionId = randomUUID();
        const childDefinition = this.workflowDefinition.steps.get(definitionChildId)!;
        childExecution = new StepExecutor(childExecutionId, childDefinition, undefined, 0, 0);
        this.executionStepsByDefinitionId.set(definitionChildId, childExecution);
        this.initChildren(childDefinition, childExecution);
      }
      childExecution.parentSteps.push(parentExecution);
      parentExecution.childSteps.push(childExecution)
    }
  }

  public async execute() {
    this.firstStepExecutions.forEach(firstStep => {
      firstStep.execute(undefined);
    });
  }
}
