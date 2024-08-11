import Operation from "../entities/Operation";
import { sleep } from "../utils/testing";

export default class WriteOnConsoleWithDelay extends Operation {
  public static readonly NAME = 'Write on Console With Delay';

  async execute(stepInput: string, prevStepOutput: string): Promise<any> {
    await sleep(1000);
    console.log(`Executing Operation ${WriteOnConsoleWithDelay.NAME}`);
    console.log('Current Step Input: ', stepInput);
    console.log('Previous Step Input: ', prevStepOutput);
    return `${prevStepOutput} ${stepInput}`;
  }
}
