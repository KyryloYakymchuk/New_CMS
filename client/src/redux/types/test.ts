export enum TestActionTypes {
  NAME = "NAME",
  LASTNAME = "LASTNAME",
}

interface IUserInfo {
  name: string;
  lastname: string;
}

export interface ITest {
  userInfo: IUserInfo;
}

export interface ITestAction {
  type: TestActionTypes.NAME;
  payload: ITest;
}

export type TestActions = ITestAction;
