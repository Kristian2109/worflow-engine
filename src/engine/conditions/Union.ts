import Condition from "./Condition"

export default class Union extends Condition {
  constructor(private conditions: Condition[]) {
    super();
  }

  public evaluate(): boolean {
    return this.conditions
      .map(condition => condition.evaluate())
      .some(value => value);
  }
}