import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../engine/repositories/WorkflowDefinitionRepository";
import WorkflowDefinition from "../engine/entities/WorkflowDefinition";
import WriteOnConsole from "../engine/operations/WriteOnConsole";
import WorkflowDefinitionStep from "../engine/entities/WorkflowDefinitionStep";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition> {
    return Promise.resolve({
      id: '5283733e-ca70-42d3-8095-e62ecde4565d',
      name: 'Workflow',
      firstStepId: '5283733e-ca70-42d3-8095-e62ecde4565d',
      steps: new Map<UUID, WorkflowDefinitionStep>([
        [
          '5283733e-ca70-42d3-8095-e62ecde4565d',
          {
            id: '5283733e-ca70-42d3-8095-e62ecde4565d',
            stepOrder: 1,
            operation: new WriteOnConsole(),
            data: "First Step",
            nextSteps: ['5283733e-ca70-42d3-8095-e62ecde4565a']
          },
        ],
        [
          '5283733e-ca70-42d3-8095-e62ecde4565a',
          {
            id: '5283733e-ca70-42d3-8095-e62ecde4565a',
            stepOrder: 2,
            operation: new WriteOnConsole(),
            data: "Second Step",
            nextSteps: []
          }
        ],
      ]),
    });
  }
}