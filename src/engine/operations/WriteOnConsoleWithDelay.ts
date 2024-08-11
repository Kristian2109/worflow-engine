import Operation from "../entities/Operation";

export default class WriteOnConsoleWithDelay extends Operation {
  public static readonly NAME = 'Write on Console With Delay';

  async execute(stepInput: string, prevStepOutput: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Executing Operation ${WriteOnConsoleWithDelay.NAME}`);
        console.log('Current Step Input: ', stepInput);
        console.log('Previous Step Input: ', prevStepOutput);
        resolve(`${prevStepOutput} ${stepInput} `)
      }, 1000);
    })
  }
}
