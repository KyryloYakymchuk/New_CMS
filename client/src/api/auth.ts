import { ILogin, ILoginPayload } from '@redux/types/auth';
import { api } from '@services/api';

export const loginReqApi = (payload: ILogin): Promise<ILoginPayload> => {
    const { value } = payload;
    return api.post('/auth/login', value);
};
