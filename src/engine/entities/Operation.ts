export default abstract class Operation {
  abstract execute(stepInput: string, prevStepOutput: string): Promise<any>;
}
