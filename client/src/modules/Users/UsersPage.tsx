import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getUsers } from '@redux/actions/users';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import { userListColumns } from '@utils/constants/ListsData/ListsData';
import { Icons } from '@utils/constants/icon';
import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';
import { UserPageContainer, PageHeader } from './styled';
import { handleListSort } from '@utils/functions/handleListSort';

type IRouterParams  = {
    page: string;
};
interface ISortParams {
    sortField?:string;
    sortParameter?:string;
}

interface ISortHandlerValue {
    currentSortParams:ISortParams;
    currSortingTypeIdx: number;
}

const LIMIT = 10;

export const UsersPage: FC = () => {
    const dispatch = useDispatch();
    const routerParams = useParams<IRouterParams>();
    const [page, setPage] = useState(1);
    const [sortParams, setSortParams] = useState<ISortParams>({ });
    const [sortingTypeIdx, setSortingTypeIdx] = useState(0);   

    const allUsers = useTypedSelector(({ users }) => users.userListData);
    const limit = 10;

    const deleteClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        //future functionality
        console.log(user);
        //log for eslint
    };
    const editClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        //future functionality
        console.log(user);      
    };
    const handleSortClick = ( sortField:string) => () => {
        const temp:ISortHandlerValue  = handleListSort(sortField, sortingTypeIdx, String(sortParams.sortField));
        setSortingTypeIdx(temp.currSortingTypeIdx);
        setSortParams(temp.currentSortParams);
    };

    const arrUserListButton = [
        { item: Icons.RegisterIcon, onClickFunc: deleteClick },
        { item: Icons.LoginIcon, onClickFunc: editClick }
    ];

    useEffect(() => {
        const currentPage = +routerParams?.page?.split('=')[1] - 1;
        const offset = currentPage * 10;
        const  queryParam = {
            ...sortParams,
            offset: offset,
            limit : limit
        };
        setPage(currentPage);
        dispatch(getUsers(queryParam));
    }, [dispatch, routerParams, sortParams]);
  
    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons title="testBtn1" type="pinkButton"/>
                <Buttons title="testBtn2" type="greyButton"/>
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
