import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../engine/repositories/WorkflowDefinitionRepository";
import WorkflowDefinition from "../engine/definitions/WorkflowDefinition";
import WriteOnConsole from "../engine/operations/WriteOnConsole";
import WorkflowDefinitionStep from "../engine/definitions/WorkflowDefinitionStep";
import WriteOnConsoleWithDelay from "../engine/operations/WriteOnConsoleWithDelay";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition> {
    const steps = new Map<UUID, WorkflowDefinitionStep>([
      [
        '5283733e-ca70-42d3-8095-e62ecde4565d',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565d',
          operation: new WriteOnConsole(),
          data: "First Step",
          nextSteps: ['5283733e-ca70-42d3-8095-e62ecde4565a', '5283733e-ca70-42d3-8095-e62ecde4565c']
        },
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565a',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565a',
          operation: new WriteOnConsoleWithDelay(),
          data: "Second Step",
          nextSteps: []
        }
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565c',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565c',
          operation: new WriteOnConsole(),
          data: "Third Step",
          nextSteps: []
        }
      ]
    ]);

    return Promise.resolve(new WorkflowDefinition(
      '5283733e-ca70-42d3-8095-e62ecde4565d',
      'Workflow',
      steps,
      ['5283733e-ca70-42d3-8095-e62ecde4565d'])
    );
  }
}