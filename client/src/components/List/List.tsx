import { IlistColums } from '@interfaces/types';
import { IUser } from '@redux/types/users';
import { FC, MouseEventHandler } from 'react';
import { ListElement } from './ListElement/ListElement';
import { ListTitle } from './ListTitle/ListTitle';
import { ListContainer } from './styled/styled';

type FuncType = (
    user: React.ChangeEvent<HTMLDivElement>
) => MouseEventHandler<HTMLDivElement>;

export interface IArrButton {
    item: JSX.Element;
    onclickFunc: FuncType;
}

interface IPrors {
    listColums: IlistColums[];
    listData?: IUser[];
    arrButton: IArrButton[];
}

export const List: FC<IPrors> = ({ listColums, listData, arrButton }) => {
    return (
        <ListContainer>
            <ListTitle listColums={listColums} />
            {listData?.map((user) => (
                <ListElement
                    key ={user.userID}
                    listColums={listColums}
                    user={user}
                    arrButton={arrButton}
                />
            ))}
        </ListContainer>
    );
};
