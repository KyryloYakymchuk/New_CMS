import { IGetUsersAction } from './../redux/types/users';
import { IDeleteUserDataAction, IUserListData } from '@redux/types/users';
import { api } from '@services/api';

export const deleteUserApi = (config: IDeleteUserDataAction): Promise<IUserListData> => {
    const { userID, queryParams } = config.payload;
    return api.delete('/users/' + userID, {
        params: queryParams
    });
};
export const getUsersApi = (config: IGetUsersAction): Promise<IUserListData> => {
    return api.get('/users/', {
        params: config.payload
    });
};
