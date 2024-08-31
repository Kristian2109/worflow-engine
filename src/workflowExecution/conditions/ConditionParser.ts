import SimpleCondition from "./SimpleCondition";

export default class ConditionParser {
  public parse(prevData: any, expression: string) {
    const leftHandSide = Number(expression.charAt(expression.length - 1)!);
    return new SimpleCondition(prevData.length, '<', leftHandSide)
  } 
};
