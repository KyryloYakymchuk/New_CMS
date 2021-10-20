import {
  ILoaderAction,
  ILoaderState,
  LoaderActionsTypes,
} from "@redux/types/loader";

const initialState: ILoaderState = { loaderStatus: false };

const loader = (state = initialState, action: ILoaderAction) => {
  switch (action.type) {
    case LoaderActionsTypes.LOADER_STATUS:
      return {
        loaderStatus: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default loader;
