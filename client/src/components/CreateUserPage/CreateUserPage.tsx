import { UserForm } from '@components/Forms/UserForm/UserForm';
import { MultiValueType } from '@interfaces/types';
import { getGroupNames } from '@redux/actions/groups';
import { addNewUser, editUser, editUserImg } from '@redux/actions/users';
import { parceOption, reduceOption } from '@utils/functions/userFormData/parseOption';
import useDebounce from '@utils/hooks/useDebounce';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUserDataSelector } from '@redux/selectors/users';
import { groupNamesSelector } from '@redux/selectors/groups';

const DEFAULT_LIMIT = 10;

export const CreateUserPage: FC = () => {
    const dispatch = useDispatch();
    const currentUser: any = useAppSelector(currentUserDataSelector);
    //problem in typed IUser cant use currentUser?.group
    const arrGroupNames = useAppSelector(groupNamesSelector);
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
    const onSubmitForm = (value: any) => {
        console.log(value);

        //different data cant typed
        const requestBody = {
            ...value,
            group: reduceOption(selectGroupArr),
            confirmedPassword: null
        };
        delete requestBody.confirmedPassword;
        delete requestBody.profileImg;
        if (currentUser) {
            const payload = new FormData();
            payload.append('img', value?.profileImg?.[0]);
            payload.append('userID', value?.userID);

            dispatch(editUser(requestBody));
            dispatch(editUserImg(payload));
        } else {
            dispatch(addNewUser(requestBody));
        }
    };

    useEffect(() => {
        const queryParams = {
            limit: DEFAULT_LIMIT,
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
