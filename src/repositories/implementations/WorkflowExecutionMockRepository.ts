import { UUID } from "crypto";
import WorkflowExecutor from "../../workflowExecution/executors/WorkflowExecutor";
import ExecutionStateRepository from "../interfaces/ExecutionStateRepository";
import ExecutionState from "../../workflowExecution/state/ExecutionState";
import StepExecutionState from "../../workflowExecution/state/StepExecutionState";

export default class WorkflowExecutionMockRepository implements ExecutionStateRepository {
  updateStepState(id: UUID, step: StepExecutionState): Promise<ExecutionState> {
    throw new Error("Method not implemented.");
  }
  create(state: ExecutionState): Promise<ExecutionState> {
    throw new Error("Method not implemented.");
  }
  update(state: ExecutionState): Promise<ExecutionState> {
    throw new Error("Method not implemented.");
  }
  getById(id: UUID): Promise<ExecutionState> {
    throw new Error("Method not implemented.");
  }
  private states: Map<UUID, WorkflowExecutor> = new Map();
}
