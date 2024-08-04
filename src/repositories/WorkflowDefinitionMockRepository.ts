import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../engine/repositories/WorkflowDefinitionRepository";
import WorkflowDefinition from "../engine/entities/WorkflowDefinition";
import WriteOnConsole from "../engine/operations/WriteOnConsole";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition> {
    return Promise.resolve({
      id: '5283733e-ca70-42d3-8095-e62ecde4565d',
      name: 'Workflow',
      steps: [
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565d',
          stepOrder: 1,
          operation: new WriteOnConsole(),
          data: "First Step"
        },
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565d',
          stepOrder: 2,
          operation: new WriteOnConsole(),
          data: "Second Step"
        }
      ]
    })
  }
}