import Operation, { OperationInput } from "./Operation";
import { JsonSchemaParser } from "./schemas/ResultSchema";


export default class ApiCall extends Operation {
  NAME = "Make An Object";
  private schemaParser = new JsonSchemaParser();
  private url: string;

  constructor(url: string, input: OperationInput[]) {
    super(input);
    this.url = url;
  }

  async execute() {
    try {
      const result = await fetch(this.url);
      if (!result.ok) {
        return ''
      }
      const resultText = await result.text();
      console.log(resultText);
      return resultText;
    } catch (error) {
      console.log(error);
      return ''
    }
  }

  getNode(stepResult: string, node: string): string {
    return this.schemaParser.parse(stepResult, node);
  }
}