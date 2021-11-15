import { ILoginAction, ILoginPayload } from '@redux/types/auth';
import { api } from '@services/api';

export const loginReqApi = (config: ILoginAction): Promise<ILoginPayload> => {
    const { value } = config.payload;
    return api.post('/auth/login', value);
};
