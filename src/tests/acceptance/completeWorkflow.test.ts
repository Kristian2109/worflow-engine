import WorkflowEngine from "../../engine/services/WorkflowEngine";
import WorkflowDefinitionMockRepository from "../../repositories/WorkflowDefinitionMockRepository";
import WorkflowExecutionMockRepository from "../../repositories/WorkflowExecutionMockRepository";

describe('Acceptance test', () => {
  const workflowDefinitionRepo = new WorkflowDefinitionMockRepository();
  const workflowExecutionMockRepo = new WorkflowExecutionMockRepository();
  const engine = new WorkflowEngine(workflowDefinitionRepo, workflowExecutionMockRepo);
  it('Runs a complete workflow', () => {
    const workflowId = '5283733e-ca70-42d3-8095-e62ecde4565d';
    const result = engine.startWorkflowExecution(workflowId);
  });
});