import StepExecution from "../entities/StepExecution";
import StepResult from "../entities/StepResult";

export default class StepExecutor {
  public async executeStep(stepExecution: StepExecution, data: any) {
    stepExecution.step.operation.execute();
  }
}
