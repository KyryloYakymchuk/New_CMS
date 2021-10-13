import { IError, ErrorActionsTypes } from "@redux/types/error";

export const ErrorAction = (payload?: IError) => ({
  type: ErrorActionsTypes.ERROR_MASSEGE,
  payload,
});
