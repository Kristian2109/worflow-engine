import { UUID } from "crypto";

export default abstract class Operation {
  abstract execute(stepInput: any, prevStepOutputs: { parentId: UUID, result: any }[]): Promise<any>;
}
