import { sleep } from "../utils/testing";
import { StepResult } from "../execution/StepResult";
import WriteOnConsole from "./WriteOnConsole";

export default class WriteOnConsoleWithDelay extends WriteOnConsole {
  public static NAME = 'Write on Console With Delay';

  async execute(stepInput: string, prevStepOutput: StepResult<string>[]): Promise<any> {
    await sleep(1000);
    super.execute(stepInput, prevStepOutput);
  }
}
