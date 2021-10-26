import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getUsers } from '@redux/actions/users';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import { userListColumns } from '@utils/constants/ListsData/ListsData';
import { Icons } from '@utils/constants/icon';
import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';

import { UserPageContainer, PageHeader } from './styled';

interface IRouterParams {
    page: string;
}

const LIMIT = 10;

export const UsersPage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const routerParams = useParams<IRouterParams>();
    const [page, setPage] = useState(1);
    const allUsers = useTypedSelector(({ users }) => users.userListData);



    const deleteClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        //future functionality
        console.log(user);
        //log for eslint
    };
    const editClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
        //future functionality
        console.log(user);
    };
    const createUserClick = () => {
        //future functionality
        history.push('/pages/createUser');
    };
    const arrUserListButton = [
        { item: Icons.RegisterIcon, onClickFunc: deleteClick },
        { item: Icons.LoginIcon, onClickFunc: editClick }
    ];

    useEffect(() => {
        const currentPage = +routerParams?.page?.split('=')[1] - 1;
        const offset = currentPage * 10;
        setPage(currentPage);
        dispatch(getUsers({ limit: 10, offset: offset }));
    }, [dispatch, routerParams]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons title="testBtn1" type="pinkButton" onClickFunction ={createUserClick} icon={Icons.FirstNameIcon}/>
                <Buttons title="testBtn2" type="greyButton" icon={Icons.FilterIcon}/>
            </PageHeader>
            <List
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
