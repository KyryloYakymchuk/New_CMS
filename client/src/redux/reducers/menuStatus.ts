import { TypeStatusAction, StatusAction } from "@redux/types/menuStatus";

interface IStatusPayload {
  status: boolean;
  itemId?: number;
}

const initialState: IStatusPayload = {
  status: true,
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
