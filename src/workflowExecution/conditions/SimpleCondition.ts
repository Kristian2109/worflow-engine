import Condition from "./Condition"

export default class SimpleCondition extends Condition {
  constructor(
    private leftSide: number, 
    private operator: string, 
    private rightSide: number,
  ) {
    super();
  }

  public evaluate(): boolean {
    switch (this.operator) {
      case '>':
        return this.leftSide > this.rightSide;
      case '<':
        return this.leftSide < this.rightSide;
      case '=':
        return this.leftSide === this.rightSide;
      default:
        return false;
    }
  }
}