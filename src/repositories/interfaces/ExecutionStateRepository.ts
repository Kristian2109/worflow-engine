import { UUID } from "crypto";
import ExecutionState from "../../workflowExecution/state/ExecutionState";
import StepExecutionState from "../../workflowExecution/state/StepExecutionState";

export default interface ExecutionStateRepository {
  create(state: ExecutionState): Promise<ExecutionState>;
  update(state: ExecutionState): Promise<ExecutionState>;
  getById(id: UUID): Promise<ExecutionState>;
  updateStepState(id: UUID, step: StepExecutionState): Promise<ExecutionState>;
}
