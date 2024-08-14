import { NextFunction, Request, Response } from "express";
import WorkflowEngine from "../engine/services/WorkflowEngine";
import { UUID } from "crypto";
import z from "zod";

interface UUIDRequest extends Request {
  params: {
    workflowId: UUID;
  };
}

export default class EngineController {
  constructor(private workflowEngine: WorkflowEngine) {}

  public async executeWorkflow(req: UUIDRequest, res: Response, next: NextFunction) {
    const workflowId = req.params.workflowId;
    const workflowExecutionResult = await this.workflowEngine.startWorkflowExecution(workflowId);
    res.status(200).json(workflowExecutionResult);
  }
}