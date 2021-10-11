import { ITest, TestActionTypes } from "@redux/types/test";

export const testActions = (payload: ITest) => ({
  type: TestActionTypes.NAME,
  payload,
});
