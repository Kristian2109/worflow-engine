import _, { get } from "lodash";
import ResultSchemaType from "./ResultSchemaTypes";

export default interface ResultSchemaParser {
  parse(stepResult: string, node: string): string;
}

export class JsonSchemaParser implements ResultSchemaParser {
  parse(stepResult: string, node: string): string {
    const result = get({ a: stepResult }, `a.${node}`)
    if (!result) {
      throw Error('Invalid result schema');
    }
    return result;
  }
};

export class StringSchemaParser implements ResultSchemaParser {
  parse(stepResult: string, node: string): string {
    return stepResult;
  }
};
