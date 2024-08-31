import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../../../repositories/interfaces/WorkflowDefinitionRepository";
import WorkflowDefinition from "../../../workflowDefinition/definitions/WorkflowDefinition";
import WriteOnConsole from "../../../workflowExecution/operations/WriteOnConsole";
import WorkflowDefinitionStep from "../../../workflowDefinition/definitions/WorkflowDefinitionStep";
import WriteOnConsoleWithDelay from "../../../workflowExecution/operations/WriteOnConsoleWithDelay";
import MakeAnObject from "../../../workflowExecution/operations/MakeAnObject";
import ApiCall from "../../../workflowExecution/operations/ApiCall";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition> {
    const steps = new Map<UUID, WorkflowDefinitionStep>([
      [
        '5283733e-ca70-42d3-8095-e62ecde4565d',
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565d', 
          new MakeAnObject({
            object: `{}`,
            operationInputs: []
          }), 
          [],
        )
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