import { UUID } from "crypto";

export type StepResult<ResultType = any> = {
  parentId: UUID,
  result: ResultType,
};