import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { getUsers } from '@redux/actions/users';

import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import { userListColums } from '@utils/constants/ListsData/ListsData';
import { Icons } from '@utils/constants/icon';

import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';

import { UserPageConteiner, PageHeader } from './styled/styled';

interface IRouterParams {
    page: string;
}

export const UsersPage: FC = () => {
    const dispatch = useDispatch();
    const routerParams = useParams<IRouterParams>();
    const [page, setPage] = useState(1);
    const allUsers = useTypedSelector(({ users }) => users.userListData);

    const limit = 10;

    const deleteClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        //future functionality 
        console.log(user);
        //log for elslint
    };
    const editClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        //future functionality
        console.log(user);
        
    };
    
    const arrUserListButton = [
        { item: Icons.RegisterIcon, onclickFunc: deleteClick },
        { item: Icons.LoginIcon, onclickFunc: editClick }
    ];
    
    useEffect(() => {
        const currentPage = +routerParams?.page?.split('=')[1] - 1;
        const offset = currentPage * 10;
        setPage(currentPage);
        dispatch(getUsers({ limit: 10, offset: offset }));
        
    }, [dispatch, routerParams]);
  
    return (
        <UserPageConteiner>
            <PageHeader>
                <Buttons title="testBtn1" type="pinkButton"  />
                <Buttons title="testBtn2" type="greyButton" />
            </PageHeader>
            <List
                listColums={userListColums}
                listData={allUsers?.users}
                arrButton={arrUserListButton}
            />
            <Pagination
                count={Number(allUsers?.count)}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </UserPageConteiner>
    );
};
