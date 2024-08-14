import { sleep } from "../utils/testing";
import { StepResult } from "../execution/StepResult";
import WriteOnConsole from "./WriteOnConsole";

export default class WriteOnConsoleWithDelay extends WriteOnConsole {
  public static NAME = 'Write on Console With Delay';

  async execute(): Promise<any> {
    await sleep(1000);
    super.execute();
  }
}
