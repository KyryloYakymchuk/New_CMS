export enum LoaderActionsTypes {
    LOADER_STATUS = 'LOADER_STATUS'
}

export interface ILoaderState {
    loaderStatus: boolean;
}

export interface ILoaderAction {
    type: LoaderActionsTypes.LOADER_STATUS;
    payload: boolean;
}

export type LoaderActions = ILoaderAction;
