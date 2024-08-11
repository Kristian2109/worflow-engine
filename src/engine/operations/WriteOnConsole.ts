import { StepResult } from "../execution/StepResult";
import Operation from "./Operation";

export default class WriteOnConsole extends Operation {
  public static NAME = 'Write on Console';

  constructor() {
    super();
  };

  async execute(stepInput: string, prevStepOutput: StepResult<string>[]): Promise<any> {
    const combinedPrevStepsOutput = prevStepOutput.map(s => s.result).join('\n');
    console.log(`Executing Operation ${WriteOnConsole.NAME}`);
    console.log('Current Step Input: ', stepInput);
    console.log('Previous Step Input: ', combinedPrevStepsOutput);
    return `${combinedPrevStepsOutput} ${stepInput} `;
  }
}
