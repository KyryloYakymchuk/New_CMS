import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setCurrentUser, getUsers, clearCurrentUser, deleteUsers } from '@redux/actions/users';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { userListColumns } from '@utils/constants/ListsData/ListsData';
import { Icons } from '@utils/constants/icon';
import { useTranslation } from 'react-i18next';
import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';
import { UserPageContainer, PageHeader, ListBlock } from './styled';
import { handleListSort } from '@utils/functions/handleListSort';
import { userListDataSelector } from '@redux/selectors/users';
import { DrawerFilterMenu } from '@components/DrawerFilterMenu/DrawerFilterMenu';
import { SingleFilterForm } from '@components/Forms/SingleFilterForm/SingleFilterForm';
import { EventChangeType,
         ISingleFilterFormValue,
         ISortHandlerValue,
         ISortParams } from '@interfaces/types';
import { IGetUsersData } from '@redux/types/users';
import { loaderAction } from '@redux/actions/loader';
import { redirectHandler } from '@utils/functions/redirectHandler';
import { offsetGenerator } from '@utils/functions/offsetGenerator';

export interface IRouterParams {
    page: string;
}



const LIMIT = 10;

export const UsersPage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    let { search, pathname } = useLocation();
    const query = new URLSearchParams(search);
    const currentPage = Number(query.get('page'));

    const [sortParams, setSortParams] = useState<ISortParams>({});
    const [deleteRequestStatus, setDeleteRequestStatus] = useState(false);
    const [userID, setUserID] = useState<string>('');
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
        if (filterFormValue !== '') {
            setFilterFormSearchStatus(!filterFormSearchStatus);
        }
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
        setFilterFormValue(value.search);
        redirectHandler(0, pathname, search, history);
    };
    const clearSingleFilterFormValue = () => {
        if (filterFormValue !== '') {
            setFilterFormSearchStatus(!filterFormSearchStatus);
        }
        setFilterFormValue('');
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
        redirectHandler(0, pathname, search, history);
    };
    const onChangeFieldValue = (e: EventChangeType) => {
        setFilterFormValue(e.target.value);
    };

    const arrUserListButton = [
        { item: <Icons.AddIcon />, onClickFunc: editUserClick },
        { item: <Icons.PersonIcon />, onClickFunc: deleteUserClick }
    ];

    useEffect(() => {
        dispatch(loaderAction(true));
        const queryParams: IGetUsersData = {
            ...sortParams,
            offset: offsetGenerator(
                currentPage,
                deleteRequestStatus,
                Number(allUsers?.count),
                pathname,
                search,
                history
            ),
            limit: LIMIT
        };
        if (filterFormValue) {
            queryParams.search = filterFormValue;
        }
        if (deleteRequestStatus) {
            dispatch(deleteUsers({ queryParams, userID }));
            setDeleteRequestStatus(false);
        } else {
            dispatch(getUsers(queryParams));
        }
    }, [dispatch, userID, currentPage, sortParams, filterFormSearchStatus]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={t('Create user')}
                    type="button"
                    style="pinkButton"
                    onClickFunction={createUserClick}
                    icon={<Icons.PersonIcon />}
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
            <ListBlock>
                <List
                    sortColumn={sortParams.sortField}
                    sortType={sortParams.sortParameter}
                    sortHandler={handleSortClick}
                    listColumns={userListColumns}
                    listData={allUsers?.users}
                    arrButton={arrUserListButton}
                />
                <Pagination count={Number(allUsers?.count)} limit={LIMIT} />
            </ListBlock>
        </UserPageContainer>
    );
};
