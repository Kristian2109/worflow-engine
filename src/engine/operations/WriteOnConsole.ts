import Operation from "../entities/Operation";

export default class WriteOnConsole extends Operation {
  public static readonly NAME = 'Write on Console';

  async execute(stepInput: string, prevStepOutput: string): Promise<any> {
    console.log(`Executing Operation ${WriteOnConsole.NAME}`);
    console.log('Current Step Input: ', stepInput);
    console.log('Previous Step Input: ', prevStepOutput);
    return `${prevStepOutput} ${stepInput} `;
  }
}
