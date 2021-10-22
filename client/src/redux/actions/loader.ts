import { LoaderActionsTypes } from '@redux/types/loader';

export const loaderAction = (payload: boolean) => ({
    type: LoaderActionsTypes.LOADER_STATUS,
    payload
});
