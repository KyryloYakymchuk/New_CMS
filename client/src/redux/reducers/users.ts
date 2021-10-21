import { IUserActions, IUsers, UserActionTypes } from '@redux/types/users';

const initialState: IUsers = {};

const users = (state = initialState, action: IUserActions): IUsers => {
    switch (action.type) {
        case UserActionTypes.SET_USERS:
            return {
                ...state,
                userListData: action.payload
            };

        default:
            return state;
    }
};

export default users;
