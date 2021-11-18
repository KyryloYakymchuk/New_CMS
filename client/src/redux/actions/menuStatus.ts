import { TypeStatusAction } from '@redux/types/menuStatus';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const statusAction = actionGenerator<boolean>(TypeStatusAction.STATUS);
export const itemIdAction = actionGenerator<number>(TypeStatusAction.ITEMID);
