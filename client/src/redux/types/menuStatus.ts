export enum TypeStatusAction {
    STATUS = 'STATUS',
    ITEMID = 'ITEMID'
}

export interface IStatusPayload {
    status: boolean;
}

export interface IStatusAction {
    type: TypeStatusAction.STATUS;
    payload: boolean;
}

export interface IItemIdPayload {
    itemId: number;
}

export interface IItemIdAction {
    type: TypeStatusAction.ITEMID;
    payload: number;
}

export type StatusAction = IStatusAction | IItemIdAction;
