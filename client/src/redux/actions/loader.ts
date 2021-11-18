import { LoaderActionsTypes } from '@redux/types/loader';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const loaderAction = actionGenerator<boolean>(LoaderActionsTypes.LOADER_STATUS);

