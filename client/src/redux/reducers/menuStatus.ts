import { mobileStepperClasses } from "@mui/material";
import { TypeStatusAction, StatusAction } from "@redux/types/menuStatus";

interface IStatusPayload {
  status: boolean;
  itemId?: number;
}

const initialState: IStatusPayload = {
  // after create mobile v switch to true
  status: false,
};

const menu = (state = initialState, action: StatusAction) => {
  switch (action.type) {
    case TypeStatusAction.STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case TypeStatusAction.ITEMID:
      return {
        ...state,
        itemId: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default menu;
