import { randomUUID, UUID } from "crypto";
import WorkflowDefinition from "../definitions/WorkflowDefinition";
import StepExecutor from "./StepExecutor";

export default class WorkflowExecutor {
  public executionStepsByDefinitionId: Map<UUID, StepExecutor> = new Map();
  public firstStepExecutions: StepExecutor[] = [];

  constructor(
    public id: UUID,
    private workflowDefinition: WorkflowDefinition,
  ) {
    this.workflowDefinition.getFirstStepIds.forEach((definitionStepId) => {
      const firstExecutionStep = this.buildStepExecution(definitionStepId);
      this.firstStepExecutions.push(firstExecutionStep);
      this.executionStepsByDefinitionId.set(definitionStepId, firstExecutionStep);
      this.initChildren(firstExecutionStep);
    });
  }

  private initChildren(parentExecution: StepExecutor) {
    for (const definitionChildId of parentExecution.definition.nextSteps) {
      let childExecution = this.executionStepsByDefinitionId.get(definitionChildId);
      if (!childExecution) {
        childExecution = this.buildStepExecution(definitionChildId);
        this.executionStepsByDefinitionId.set(definitionChildId, childExecution);
        this.initChildren(childExecution);
      }
      childExecution.parentSteps.push(parentExecution);
      parentExecution.childSteps.push(childExecution);
    }
  }

  private buildStepExecution(stepDefinitionId: UUID) {
    const childDefinition = this.workflowDefinition.getStepById(stepDefinitionId)!;
    childDefinition.operation.addReferenceToSteps(this.executionStepsByDefinitionId);
    return new StepExecutor(randomUUID(), childDefinition, undefined, 0, 0);
  }

  public async execute() {
    const promises = this.firstStepExecutions.map(firstStep => {
      firstStep.execute();
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }
}
