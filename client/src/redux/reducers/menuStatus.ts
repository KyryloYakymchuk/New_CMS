import { TypeStatusAction, StatusAction, IStatusPayload } from "@redux/types/menuStatus";



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



      default:
        return state;
  }
};

export default menu;
