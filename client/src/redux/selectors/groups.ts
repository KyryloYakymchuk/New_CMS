import { RootState } from '@redux/reducers';

export const groupNamesSelector = (state: RootState) => state.groups.groupNames?.groups;
