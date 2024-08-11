export default abstract class Operation {
  abstract execute(stepInput: any, prevStepOutput: any): Promise<any>;
}
