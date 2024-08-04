import { Request, Response } from "express";
import WorkflowEngine from "../engine/services/WorkflowEngine";
import { UUID } from "crypto";

interface UUIDRequest extends Request {
  params: {
    workflowId: UUID;
  };
}

export default class EngineController {
  constructor(private workflowEngine: WorkflowEngine) {}

  public async executeWorkflow(req: UUIDRequest, res: Response) {
    const workflowId = req.params.workflowId;
    const workflowExecutionResult = await this.workflowEngine.startWorkflowExecution(workflowId);
    res.status(200).json(workflowExecutionResult);
  }
}