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
    workflowDefinition.firstStepIds.forEach((definitionStepId) => {
      const firstDefintionStep = workflowDefinition.getStepById(definitionStepId);
      const firstExecutionStep = new StepExecutor(randomUUID(), firstDefintionStep, undefined, 0, 0);
      this.firstStepExecutions.push(firstExecutionStep);
      this.executionStepsByDefinitionId.set(definitionStepId, firstExecutionStep);
      this.initChildren(workflowDefinition.getStepById(definitionStepId), firstExecutionStep);
    });
  }

  public initChildren(parentDefinition: WorkflowDefinitionStep, parentExecution: StepExecutor) {
    for (const definitionChildId of parentDefinition.nextSteps) {
      let childExecution = this.executionStepsByDefinitionId.get(definitionChildId);
      if (!childExecution) {
        const childDefinition = this.workflowDefinition.steps.get(definitionChildId)!;
        childExecution = new StepExecutor(randomUUID(), childDefinition, undefined, 0, 0);
        this.executionStepsByDefinitionId.set(definitionChildId, childExecution);
        const childInputStepIds = childDefinition.operation.getInputStepIds();
        childInputStepIds.forEach(executionId => {
          const inputDefinition = this.executionStepsByDefinitionId.get(executionId);
          if (!inputDefinition) {
            throw new Error("Invalid input definition id!");
          }
          childDefinition.operation.addStepExecutor(executionId, inputDefinition);
        });
        this.initChildren(childDefinition, childExecution);
      }
      childExecution.parentSteps.push(parentExecution);
      parentExecution.childSteps.push(childExecution);
    }
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
