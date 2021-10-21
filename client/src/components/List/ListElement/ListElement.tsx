import { iUser } from "@redux/types/users";
import { FC, MouseEventHandler } from "react";
import { JsxElement } from "typescript";

import { ListElementContainer } from "./styled/styled";

export interface IlistColums {
  title: string;
  name: string;
}
 interface IArrButton  {
  item: any;
  onclickFunc: (user: React.ChangeEvent<HTMLDivElement>) => MouseEventHandler<HTMLDivElement>;
}
interface IProps {
  listColums: IlistColums[];
  user?: any;
  arrButton?: IArrButton[];
}

export const ListElement: FC<IProps> = ({ listColums, user, arrButton }) => {
  //console.log();
  
  return (
    <ListElementContainer>
      {user ? listColums.map(({ name }) => <div>{user[name]}</div>) : null}
      <div>
        {arrButton?.map(({item, onclickFunc }) => (
          <div onClick={onclickFunc(user)}>{item}</div>
        ))}{" "}
      </div>
    </ListElementContainer>
  );
};
