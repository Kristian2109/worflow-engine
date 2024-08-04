import express, { Request, Response, json } from 'express';
import dotenv from 'dotenv';
import { urlencoded } from 'body-parser';
import WorkflowDefinitionRepository from './engine/repositories/WorkflowDefinitionRepository';
import WorkflowDefinitionMockRepository from './repositories/WorkflowDefinitionMockRepository';
import WorkflowEngine from './engine/engine';
import EngineController from './controllers/engineController';
import requestHandler from './controllers/requestHandler';
import { workflowIdQueryValidator } from './controllers/validators/engineControllerValidators';
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(urlencoded({ extended: true }));
app.use(json());

const repository: WorkflowDefinitionRepository = new WorkflowDefinitionMockRepository();
const engine = new WorkflowEngine(repository);
const controller = new EngineController(engine);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.post(
  '/engine/execute/:workflowId', 
  requestHandler(workflowIdQueryValidator),
  controller.executeWorkflow.bind(controller)
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});