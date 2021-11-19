import { RootState } from '@redux/reducers';
export const modulesListSelector = (state: RootState) => state.modules.modules;
export const editableDataSelector = (state: RootState) => state.modules.editableModule;
export const editableFieldDataSelector = (state: RootState) => state.modules.editableField;
