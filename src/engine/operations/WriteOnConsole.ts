import Operation, { OperationInput } from "./Operation";
import { StringSchemaParser } from "./schemas/ResultSchema";

export default class WriteOnConsole extends Operation {
  NAME = 'Write on Console';
  private schemaParser = new StringSchemaParser();

  constructor(input: OperationInput) {
    super([input]);
  };

  async execute(): Promise<any> {
    const payload = this.getPayloadForInput(this.inputs[0])
    console.log(`Executing Operation ${this.NAME}`);
    console.log('Current Step Input: ', payload);
    return payload;
  }

  getNode(stepResult: string, node: string) {
    return this.schemaParser.parse(stepResult, node);
  }
}
