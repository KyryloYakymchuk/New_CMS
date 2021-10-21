import { iUser } from "@redux/types/users";
import { FC, MouseEventHandler } from "react";
import { JsxElement } from "typescript";
import { ListElement } from "./ListElement/ListElement";
import { ListTitle } from "./ListTitle/ListTitle";

import { ListContainer } from "./styled/styled";

interface IArrButton {
  item: any;
  onclickFunc: (
    user: React.ChangeEvent<HTMLDivElement>
  ) => MouseEventHandler<HTMLDivElement>;
}

export interface IlistColums {
  title: string;
  name: string;
}
interface IPrors {
  listColums: IlistColums[];
  listData?: any[];
  arrButton: IArrButton[];
}

export const List: FC<IPrors> = ({ listColums, listData, arrButton }) => {
  return (
    <ListContainer>
      <ListTitle listColums={listColums} />
      {listData?.map((user) => (
        <ListElement
          listColums={listColums}
          user={user}
          arrButton={arrButton}
        />
      ))}
    </ListContainer>
  );
};
