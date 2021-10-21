import { ITest, TestActions, TestActionTypes } from "@redux/types/test";

const initialState: ITest = {
  userInfo: {
    name: "",
    lastname: "",
  },
};

const test = (state = initialState, action: TestActions) => {
  switch (action.type) {
    case TestActionTypes.NAME:
      return {
        ...state,
        userInfo: action.payload,
      };

      default:
        return state;
  }
};

export default test;
