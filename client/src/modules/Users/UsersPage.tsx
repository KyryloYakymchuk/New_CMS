import { Buttons } from "@components/Button/Button";
import { List } from "@components/List/List";
import { Pagination } from "@components/Pagination/Pagination";
import { getUsers } from "@redux/actions/users";
import { useTypedSelector } from "@utils/hooks/useTypedSelector";

import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { UserPageConteiner, PageHeader } from "./styled/styled";
import LockOpenIcon from "@mui/icons-material/LockOpen";

interface IRouterParams {
  page: string;
}

export const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const routerParams = useParams<IRouterParams>();

  const allUsers = useTypedSelector(({ users }) => users.userListData);

  useEffect(() => {
    const currentPage = +routerParams.page.split("=")[1] - 1;
    const offset = currentPage * 10;
    setPage(currentPage);
    dispatch(getUsers({ limit: limit, offset: offset }));
  }, [dispatch, routerParams]);

  const listColums = [
    { title: "Name", name: "name" },
    { title: "Email", name: "email" },
    { title: "Number", name: "phone" },
  ];
  const deleteClick = (user: React.ChangeEvent<HTMLDivElement>) => () => {
    console.log(user);
  };
  const editClick = (user:  React.ChangeEvent<HTMLDivElement>) => () => {
    console.log(user);
  };
  const arrButton = [
    { item: <LockOpenIcon />, onclickFunc: deleteClick },
    { item: <LockOpenIcon />, onclickFunc: editClick },
  ];

  return (
    <UserPageConteiner>
      <PageHeader>
        <Buttons title="testBtn1" type="pinkButton" />
        <Buttons title="testBtn2" type="greyButton" />
      </PageHeader>
      <List
        listColums={listColums}
        listData={allUsers?.users}
        arrButton={arrButton}
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
