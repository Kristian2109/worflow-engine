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
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565d',
          operation: new WriteOnConsole({ payload: "First Step" }),
          nextSteps: ['5283733e-ca70-42d3-8095-e62ecde4565a', '5283733e-ca70-42d3-8095-e62ecde4565c'],
        },
      ],
      [ 
        '5283733e-ca70-42d3-8095-e62ecde4565k',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565k',
          operation: new ApiCall('https://dummyjson.com/c/9b38-c60d-4435-b93b', []),
          nextSteps: [],
        }
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565a',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565a',
          operation: new WriteOnConsoleWithDelay({
            payload: "5283733e-ca70-42d3-8095-e62ecde4565d", 
            stepDefinitionId: "5283733e-ca70-42d3-8095-e62ecde4565d",
          }),
          nextSteps: ['5283733e-ca70-42d3-8095-e62ecde4565e']
        }
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565c',
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565c',
          operation: new WriteOnConsole({ payload: "Third Step" }),
          nextSteps: ['5283733e-ca70-42d3-8095-e62ecde4565l'],
        }
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565e', 
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565e',
          operation: new MakeAnObject({
            object: '{ hey: 5283733e-ca70-42d3-8095-e62ecde4565d }',
            operationInputs: [{
              payload: '5283733e-ca70-42d3-8095-e62ecde4565d',
              stepDefinitionId: '5283733e-ca70-42d3-8095-e62ecde4565d'
            }],
          }),
          nextSteps: []
        }
      ],
      [
        '5283733e-ca70-42d3-8095-e62ecde4565l', 
        {
          id: '5283733e-ca70-42d3-8095-e62ecde4565l',
          operation: new MakeAnObject({
            object: '{ hey: 5283733e-ca70-42d3-8095-e62ecde4565c }',
            operationInputs: [{
              payload: '5283733e-ca70-42d3-8095-e62ecde4565c',
              stepDefinitionId: '5283733e-ca70-42d3-8095-e62ecde4565c'
            }],
          }),
          nextSteps: []
        }
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