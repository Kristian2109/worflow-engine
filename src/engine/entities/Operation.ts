export default abstract class Step {
  abstract execute(): Promise<void>;
}
