import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../../../engine/repositories/WorkflowDefinitionRepository";
import WorkflowDefinition from "../../../engine/definitions/WorkflowDefinition";
import WriteOnConsole from "../../../engine/operations/WriteOnConsole";
import WorkflowDefinitionStep from "../../../engine/definitions/WorkflowDefinitionStep";
import WriteOnConsoleWithDelay from "../../../engine/operations/WriteOnConsoleWithDelay";
import MakeAnObject from "../../../engine/operations/MakeAnObject";
import ApiCall from "../../../engine/operations/ApiCall";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition> {
    const steps = new Map<UUID, WorkflowDefinitionStep>([
      [
        '5283733e-ca70-42d3-8095-e62ecde4565d',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565d',
          operation: new MakeAnObject({
            object: `{}`,
            operationInputs: []
          }),
          nextSteps: [],
        },
      ],
    ]);

    return Promise.resolve(new WorkflowDefinition(
      '5283733e-ca70-42d3-8095-e62ecde4565d',
      'Workflow',
      steps,
      ['5283733e-ca70-42d3-8095-e62ecde4565d'])
    );
  }
}