export enum ModalActionsTypes {
  MODAL_STATUS = "MODAL_STATUS",
}

export interface IModalState {
  modal: boolean;
}

export interface IModalAction {
  type: ModalActionsTypes.MODAL_STATUS;
  payload: boolean;
}

export type ModalActions = IModalAction;
