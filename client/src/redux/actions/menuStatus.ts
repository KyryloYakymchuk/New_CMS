import { TypeStatusAction } from '@redux/types/menuStatus';

export const statusAction = (payload: boolean) => ({
    type: TypeStatusAction.STATUS,
    payload
});

export const itemIdAction = (payload: number) => ({
    type: TypeStatusAction.ITEMID,
    payload
});
