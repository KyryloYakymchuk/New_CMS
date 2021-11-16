import { UserForm } from '@components/Forms/UserForm/UserForm';
import { IOption, MultiValueType } from '@interfaces/types';
import { getGroupNames } from '@redux/actions/groups';
import { addNewUser, editUser, editUserImg } from '@redux/actions/users';
import useDebounce from '@utils/hooks/useDebounce';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProtectedRoutes } from '@utils/enums/RoutesPath';
import { currentUserDataSelector } from '@redux/selectors/users';
import { groupNamesSelector } from '@redux/selectors/groups';
import { IGetGroupsData } from '@redux/types/groups';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { setModalStatusAction } from '@redux/actions/modal';
import { useHistory } from 'react-router';
import { modalMessageSelector, modalStatusSelector } from '@redux/selectors/modal';

const DEFAULT_LIMIT = 10;

export const CreateUserPage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser: any = useAppSelector(currentUserDataSelector);
    //problem in typed IUser cant use currentUser?.group
    const arrGroupNames = useAppSelector<IOption[] | undefined>(groupNamesSelector);
    const [selectGroupName, setSelectGroupName] = useState<string>();
    const [selectGroupArr, setSelectGroupArr] = useState<MultiValueType>(currentUser?.group);
    const debouncedSelectGroupName = useDebounce(selectGroupName, 500);

    const getSelectData = (newValue: string) => {
        setSelectGroupName(newValue);
    };
    const onChangeMultiValue = (newValue: MultiValueType) => {
        setSelectGroupArr(newValue);
    };
    const onSubmitForm = (value: any) => {
        //different data cant typed
        const requestBody = {
            ...value,
            group: selectGroupArr
        };
        delete requestBody.confirmedPassword;
        delete requestBody.profileImg;
        if (currentUser) {
            dispatch(editUser(requestBody));
            if (value?.profileImg?.[0]) {
                const payload = new FormData();
                payload.append('img', value?.profileImg?.[0]);
                payload.append('userID', value?.userID);
                dispatch(editUserImg(payload));
            }
        } else {
            dispatch(addNewUser(requestBody));
        }
    };
    const handleAccept = () => {
        dispatch(setModalStatusAction(false));
        history.push(ProtectedRoutes.USERS);
    };

    useEffect(() => {
        const queryParams: IGetGroupsData = {
            limit: DEFAULT_LIMIT
        };
        if (debouncedSelectGroupName) {
            queryParams.search = String(debouncedSelectGroupName);
        }
        dispatch(getGroupNames(queryParams));
    }, [dispatch, debouncedSelectGroupName]);
    const isModalOpen = useAppSelector(modalStatusSelector);
    const message = useAppSelector(modalMessageSelector);
    return (
        <div>
            <UserForm
                onSubmitForm={onSubmitForm}
                selectGroupArr={selectGroupArr}
                onChangeMultiValue={onChangeMultiValue}
                currentUser={currentUser}
                arrGroupNames={arrGroupNames}
                getSelectData={getSelectData}
            />
            <ModalConfirm handleAccept={handleAccept} message={message} modalStatus={isModalOpen}>
                <ModalButton handleAccept={handleAccept} />
            </ModalConfirm>
        </div>
    );
};
