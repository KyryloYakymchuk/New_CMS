import { FC } from "react";
import UserItem from "@components/UserItem/UserItem";
import List from "@components/List/List";

export const UserPage: FC = () => {
  return (
    <List>
      <UserItem />
    </List>
  );
};
