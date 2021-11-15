import { IGetGroupsDataAction, IGroupNames, ISetGroupsData } from '@redux/types/groups';
import { api } from '@services/api';

export const getGroupsApi = (config: IGetGroupsDataAction): Promise<ISetGroupsData> => {
    return api.get('/groups/', {
        params: config.payload
    });
};
export const getGroupNamesApi = (config: IGetGroupsDataAction): Promise<IGroupNames> => {
    return api.get('/groups/select-data', {
        params: config.payload
    });
};
