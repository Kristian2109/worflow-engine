import express, { Request, Response, json } from 'express';
import dotenv from 'dotenv';
import { urlencoded } from 'body-parser';
import WorkflowDefinitionRepository from './engine/repositories/WorkflowDefinitionRepository';
import WorkflowDefinitionMockRepository from './repositories/WorkflowDefinitionMockRepository';
import WorkflowEngine from './engine/services/WorkflowEngine';
import EngineController from './controllers/engineController';
import requestHandler from './controllers/requestHandler';
import { workflowIdQueryValidator } from './controllers/validators/engineControllerValidators';
import WorkflowExecutionRepository from './engine/repositories/WorkflowExecutionRepository';
import WorkflowExecutionMockRepository from './repositories/WorkflowExecutionMockRepository';
import StepExecutor from './engine/services/StepExecutor';
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(urlencoded({ extended: true }));
app.use(json());

const definitionRepository: WorkflowDefinitionRepository = new WorkflowDefinitionMockRepository();
const executionRepository: WorkflowExecutionRepository = new WorkflowExecutionMockRepository();
const stepExecutor = new StepExecutor();
const engine = new WorkflowEngine(definitionRepository, executionRepository, stepExecutor);
const controller = new EngineController(engine);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.post(
  '/workflow/:workflowId/execute', 
  requestHandler(workflowIdQueryValidator),
  controller.executeWorkflow.bind(controller)
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});