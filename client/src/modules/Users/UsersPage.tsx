import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath, useHistory, useParams } from 'react-router';
import { setCurrentUser, getUsers, clearCurrentUser, deleteUsers } from '@redux/actions/users';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { userListColumns } from '@utils/constants/ListsData/ListsData';
import { Icons } from '@utils/constants/icon';
import { useTranslation } from 'react-i18next';
import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';
import { UserPageContainer, PageHeader } from './styled';
import { handleListSort } from '@utils/functions/handleListSort';
import { userListDataSelector } from '@redux/selectors/users';
import { DrawerFilterMenu } from '@components/DrawerFilterMenu/DrawerFilterMenu';
import { SingleFilterForm } from '@components/Forms/SingleFilterForm/SingleFilterForm';
import { EventChangeType, ISingleFilterFormValue } from '@interfaces/types';
import { IGetUsersData } from '@redux/types/users';
import { loaderAction } from '@redux/actions/loader';

export interface IRouterParams {
    page: string;
}
interface ISortParams {
    sortField?: string;
    sortParameter?: string;
}
interface ISortHandlerValue {
    currentSortParams: ISortParams;
    currSortingTypeIdx: number;
}

const LIMIT = 10;

export const UsersPage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    let routerParams = useParams<IRouterParams>();
    const [page, setPage] = useState(1);
    const [sortParams, setSortParams] = useState<ISortParams>({});
    const [deleteRequestStatus, setDeleteRequestStatus] = useState(false);
    const [userID, setUserID] = useState<string>();
    const [filterFormValue, setFilterFormValue] = useState<string>('');
    const [filterFormSearchStatus, setFilterFormSearchStatus] = useState(false);
    const [drawerMenuOpenStatus, setDrawerMenuOpenStatus] = React.useState(false);
    const [sortingTypeIdx, setSortingTypeIdx] = useState(0);

    const allUsers = useAppSelector(userListDataSelector);

    const deleteUserClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        const temp: any = user;
        setUserID(temp.userID);
        setDeleteRequestStatus(true);
    };
    const editUserClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        dispatch(setCurrentUser(user));
        history.push('/pages/editUser');
    };
    const handleSortClick = (sortField: string) => () => {
        const temp: ISortHandlerValue = handleListSort(
            sortField,
            sortingTypeIdx,
            String(sortParams.sortField)
        );
        setSortingTypeIdx(temp.currSortingTypeIdx);
        setSortParams(temp.currentSortParams);
    };
    const createUserClick = () => {
        dispatch(clearCurrentUser());
        history.push('/pages/createUser');
    };
    const toggleDrawerMenu = () => {
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
    };
    const onSubmitSingleFilterForm = (value: ISingleFilterFormValue) => {
        setFilterFormSearchStatus(!filterFormSearchStatus);
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
        setFilterFormValue(value.search);
        history.push(
            generatePath('/users/:page', {
                page: 'page=1'
            })
        );
    };
    const clearSingleFilterFormValue = () => {
        setFilterFormValue('');
        setFilterFormSearchStatus(!filterFormSearchStatus);
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
        history.push(
            generatePath('/users/:page', {
                page: 'page=1'
            })
        );
    };
    const onChangeFieldValue = (e: EventChangeType) => {
        setFilterFormValue(e.target.value);
    };

    const arrUserListButton = [
        { item: Icons.RegisterIcon, onClickFunc: editUserClick },
        { item: Icons.LoginIcon, onClickFunc: deleteUserClick }
    ];

    useEffect(() => {
        dispatch(loaderAction(true));
        const currentPage = +routerParams?.page?.split('=')[1] - 1;
        const offset = currentPage * 10;
        const queryParams: IGetUsersData = {
            ...sortParams,
            offset: offset,
            limit: LIMIT
        };
        if (filterFormValue) {
            queryParams.search = filterFormValue;
        }

        setPage(currentPage);
        if (deleteRequestStatus) {
            dispatch(deleteUsers({ queryParams, userID }));
            setDeleteRequestStatus(false);
        } else {
            dispatch(getUsers(queryParams));
        }
    }, [dispatch, userID, routerParams, sortParams, filterFormSearchStatus]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={t('Create user')}
                    type="button"
                    style="pinkButton"
                    onClickFunction={createUserClick}
                    icon={Icons.FirstNameIcon}
                />
                <DrawerFilterMenu
                    toggleDrawerMenu={toggleDrawerMenu}
                    drawerMenuOpenStatus={drawerMenuOpenStatus}
                >
                    <SingleFilterForm
                        filterFormValue={filterFormValue}
                        onSubmitSingleFilterForm={onSubmitSingleFilterForm}
                        clearSingleFilterFormValue={clearSingleFilterFormValue}
                        onChangeFieldValue={onChangeFieldValue}
                    />
                </DrawerFilterMenu>
            </PageHeader>
            <List
                sortColumn={sortParams.sortField}
                sortType={sortParams.sortParameter}
                sortHandler={handleSortClick}
                listColumns={userListColumns}
                listData={allUsers?.users}
                arrButton={arrUserListButton}
            />

            <Pagination
                count={Number(allUsers?.count)}
                limit={LIMIT}
                page={page}
                setPage={setPage}
            />
        </UserPageContainer>
    );
};
