import { UUID } from "crypto";
import WorkflowDefinitionRepository from "../interfaces/WorkflowDefinitionRepository";
import WorkflowDefinition from "../../workflowDefinition/definitions/WorkflowDefinition";
import WriteOnConsole from "../../workflowExecution/operations/WriteOnConsole";
import WorkflowDefinitionStep from "../../workflowDefinition/definitions/WorkflowDefinitionStep";
import WriteOnConsoleWithDelay from "../../workflowExecution/operations/WriteOnConsoleWithDelay";
import MakeAnObject from "../../workflowExecution/operations/MakeAnObject";
import ApiCall from "../../workflowExecution/operations/ApiCall";

export default class WorkflowDefinitionMockRepository implements WorkflowDefinitionRepository {
  getWorkflowDefinitionById(id: UUID): Promise<WorkflowDefinition> {
    const steps = new Map<UUID, WorkflowDefinitionStep>([
      [
        '5283733e-ca70-42d3-8095-e62ecde4565d',
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565d',
          new WriteOnConsole({ payload: "First Step" }),
          ['5283733e-ca70-42d3-8095-e62ecde4565a', '5283733e-ca70-42d3-8095-e62ecde4565c'],
        )
      ],
      [ 
        '5283733e-ca70-42d3-8095-e62ecde4565k',
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565k',
          new ApiCall('https://dummyjson.com/c/9b38-c60d-4435-b93b', []),
          [],
        ),
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565a',
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565a',
          new WriteOnConsoleWithDelay({
            payload: "5283733e-ca70-42d3-8095-e62ecde4565d", 
            stepDefinitionId: "5283733e-ca70-42d3-8095-e62ecde4565d",
          }),
          ['5283733e-ca70-42d3-8095-e62ecde4565e'],
        ),
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565c',
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565c',
          new WriteOnConsole({ payload: "Third Step" }),
          ['5283733e-ca70-42d3-8095-e62ecde4565l'],
        )
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565e', 
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565e',
          new MakeAnObject({
            object: '{ hey: 5283733e-ca70-42d3-8095-e62ecde4565d }',
            operationInputs: [{
              payload: '5283733e-ca70-42d3-8095-e62ecde4565d',
              stepDefinitionId: '5283733e-ca70-42d3-8095-e62ecde4565d'
            }],
          }),
          [],
        ),
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565l', 
        new WorkflowDefinitionStep('5283733e-ca70-42d3-8095-e62ecde4565l',
          new MakeAnObject({
            object: '{ hey: 5283733e-ca70-42d3-8095-e62ecde4565c }',
            operationInputs: [{
              payload: '5283733e-ca70-42d3-8095-e62ecde4565c',
              stepDefinitionId: '5283733e-ca70-42d3-8095-e62ecde4565c'
            }],
          }),
          [],
        ),
      ]
    ]);

    return Promise.resolve(new WorkflowDefinition(
      '5283733e-ca70-42d3-8095-e62ecde4565d',
      'Workflow',
      steps,
      ['5283733e-ca70-42d3-8095-e62ecde4565d', '5283733e-ca70-42d3-8095-e62ecde4565k'])
    );
  }
}