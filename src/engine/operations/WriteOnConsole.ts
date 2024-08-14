import Operation, { OperationInput } from "./Operation";

export default class WriteOnConsole extends Operation {
  NAME = 'Write on Console';

  constructor(input: OperationInput) {
    super([input]);
  };

  async execute(): Promise<any> {
    const payload = this.getPayloadForInput(this.inputs[0])
    console.log(`Executing Operation ${this.NAME}`);
    console.log('Current Step Input: ', payload);
    return payload;
  }
}
