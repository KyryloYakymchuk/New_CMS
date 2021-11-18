import { IDeleteUserData } from '@redux/types/users';
import { IUserListData } from '@redux/types/users';
import { api } from '@services/api';
import { IQueryParams } from '@redux/types/modules';

export const deleteUserApi = (payload: IDeleteUserData): Promise<IUserListData> => {
    const { userID, queryParams } = payload;
    return api.delete('/users/' + userID, {
        params: queryParams
    });
};
export const getUsersApi = (payload: IQueryParams): Promise<IUserListData> => {
    return api.get('/users/', {
        params: payload
    });
};
