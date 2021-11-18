import { IGetGroupsData, IGroupNames, ISetGroupsData } from '@redux/types/groups';
import { api } from '@services/api';

export const getGroupsApi = (payload: IGetGroupsData): Promise<ISetGroupsData> => {
    return api.get('/groups/', {
        params: payload
    });
};
export const getGroupNamesApi = (payload: IGetGroupsData): Promise<IGroupNames> => {
    return api.get('/groups/select-data', {
        params: payload
    });
};
