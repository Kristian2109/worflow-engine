import Condition from "./Condition"

export default class Intersection extends Condition {
  constructor(private conditions: Condition[]) {
    super();
  }

  public evaluate(): boolean {
    return this.conditions
      .map(condition => condition.evaluate())
      .every(value => value);
  }
}