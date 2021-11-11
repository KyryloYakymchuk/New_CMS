export enum ModalActionsTypes {
    MODAL_STATUS = 'MODAL_STATUS',
    MODAL_MESSAGE = 'MODAL_MESSAGE'
}

export interface IModalState {
    modalStatus: boolean;
    modalMessage?:string;
}

export interface IModalAction {
    type: ModalActionsTypes.MODAL_STATUS;
    payload: boolean;
}

export interface IModaMessagelAction {
    type: ModalActionsTypes.MODAL_MESSAGE;
    payload: string;
}


export type ModalActions = IModalAction | IModaMessagelAction;
