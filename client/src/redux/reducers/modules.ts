import { IModuleActions, IModules, ModulesActionTypes } from '@redux/types/modules';

const initialState: IModules = {};

const modules = (state = initialState, action: IModuleActions):IModules => {
    switch (action.type) {
        case ModulesActionTypes.SET_MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case ModulesActionTypes.SET_EDIT_DATA_MODULE:
            return {
                ...state,
                editableModule: action.payload
            };
        default:
            return state;
    }
};

export default modules;
