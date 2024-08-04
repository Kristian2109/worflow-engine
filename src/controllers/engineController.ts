import { Request, Response } from "express";
import WorkflowEngine from "../engine/engine";
import { UUID } from "crypto";

interface UUIDRequest extends Request {
  query: {
    workflowId: UUID;
  };
}

export default class EngineController {
  constructor(private workflowEngine: WorkflowEngine) {}

  public async executeWorkflow(req: UUIDRequest, res: Response) {
    const workflowId = req.query.workflowId;
    const workflowExecutionId = await this.workflowEngine.executeWorkflow(workflowId);
    res.status(200).json({ workflowExecutionId });
  }
}