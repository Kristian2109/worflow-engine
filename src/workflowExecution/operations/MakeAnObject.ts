import Operation, { OperationInput } from "./Operation";
import { JsonSchemaParser } from "./schemas/ResultSchema";
import { StringSchema } from "./schemas/ResultSchemaTypes";

type MakeAnObjectInput = {
  object: string,
  operationInputs: OperationInput[]
};

export default class MakeAnObject extends Operation{
  NAME = "Make An Object";
  private object: string;
  private schemaParser = new JsonSchemaParser();

  constructor(input: MakeAnObjectInput) {
    super(input.operationInputs);
    this.object = input.object;
  }

  execute() {
    let result = this.object;
    this.inputs.forEach(input => {
      const i = this.getPayloadForInput(input);
      result = result.replace(input.payload, i);
    });
    console.log(`Executing Operation: ${this.NAME}`)
    console.log(result)
    return result;
  }

  getNode(stepResult: string, node: string): string {
    return this.schemaParser.parse(stepResult, node);
  }
}