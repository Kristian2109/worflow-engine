import express, { Request, Response, json } from 'express';
import dotenv from 'dotenv';
import { urlencoded } from 'body-parser';
import WorkflowDefinitionRepository from './repositories/interfaces/WorkflowDefinitionRepository';
import WorkflowDefinitionMockRepository from './repositories/implementations/WorkflowDefinitionMockRepository';
import WorkflowEngine from './services/WorkflowEngine';
import EngineController from './controllers/engineController';
import requestHandler from './controllers/requestHandler';
import { workflowIdQueryValidator } from './controllers/validators/engineControllerValidators';
import ExecutionStateRepository from './repositories/interfaces/ExecutionStateRepository';
import WorkflowExecutionMockRepository from './repositories/implementations/WorkflowExecutionMockRepository';
import errorHandler from './controllers/errorHandler';
import errorLogger from './controllers/errorLogger';
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(urlencoded({ extended: true }));
app.use(json());

const definitionRepository: WorkflowDefinitionRepository = new WorkflowDefinitionMockRepository();
const executionRepository: ExecutionStateRepository = new WorkflowExecutionMockRepository();
const engine = new WorkflowEngine(definitionRepository, executionRepository);
const controller = new EngineController(engine);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.post(
  '/workflow/:workflowId/execute', 
  requestHandler(workflowIdQueryValidator),
  requestHandler(controller.executeWorkflow.bind(controller))
)

app.use(errorHandler);
app.use(errorLogger);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});