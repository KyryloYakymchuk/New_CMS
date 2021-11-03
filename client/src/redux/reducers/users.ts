import { IUserActions, IUsers, UserActionTypes } from '@redux/types/users';

const initialState: IUsers = {};

const users = (state = initialState, action: IUserActions): IUsers => {
    switch (action.type) {
        case UserActionTypes.SET_USERS:
            return {
                ...state,
                userListData: action.payload
            };
        case UserActionTypes.SET_CURRENT_USERS:
            return {
                ...state,
                currentUserData: action.payload
            };
        case UserActionTypes.CLEAR_CURRENT_USERS:
            return initialState;

        default:
            return state;
    }
};

export default users;
