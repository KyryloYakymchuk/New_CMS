import { LoaderActionsTypes } from "@redux/types/loader";

export const LoaderAction = (payload: boolean) => ({
  type: LoaderActionsTypes.LOADER_STATUS,
  payload,
});
