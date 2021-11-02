import { UserForm } from '@components/Forms/UserForm/UserForm';
import { MultiValueType } from '@interfaces/types';
import { getGroupNames } from '@redux/actions/groups';
import { addNewUser, editUser } from '@redux/actions/users';
import { IUser } from '@redux/types/users';
import { parceOption, reduceOption } from '@utils/functions/userFormData/parseOption';
import useDebounce from '@utils/hooks/useDebounce';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const CreateUserPage: FC = () => {
    const dispatch = useDispatch();
    const currentUser: any = useAppSelector(({ users }) => users.currentUserData);
    //problem in typed IUser cant use currentUser?.group
    const arrGroupNames = useAppSelector(({ groups }) => groups.groupNames);
    const [selectGroupName, setSelectGroupName] = useState<string>();
    const [selectGroupArr, setSelectGroupArr] = useState<MultiValueType>(
        parceOption(currentUser?.group)
    );
    const debouncedSelectGroupName = useDebounce(selectGroupName, 500);

    const getSelectData = (newValue: string) => {
        setSelectGroupName(newValue);
    };
    const onChangeMultiValue = (newValue: MultiValueType) => {
        setSelectGroupArr(newValue);
    };
    const onSubmitForm = (value: IUser) => {
        const requestBody = {
            ...value,
            group: reduceOption(selectGroupArr),
            confirmedPassword: null
        };

        if (currentUser) {
            dispatch(editUser(requestBody));
        } else {
            dispatch(addNewUser(requestBody));
        }
    };

    useEffect(() => {
        const queryParams = {
            limit: 10,
            search: debouncedSelectGroupName
        };
        dispatch(getGroupNames(queryParams));
    }, [dispatch, debouncedSelectGroupName]);

    return (
        <UserForm
            onSubmitForm={onSubmitForm}
            selectGroupArr={selectGroupArr}
            onChangeMultiValue={onChangeMultiValue}
            currentUser={currentUser}
            arrGroupNames={arrGroupNames}
            getSelectData={getSelectData}
        />
    );
};
