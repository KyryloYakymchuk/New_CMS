import React, { FC, MouseEventHandler } from 'react';
import { IUser } from '@redux/types/users';
import { IListColumns } from '@interfaces/types';
import { ListElement } from './ListElement/ListElement';
import { ListTitle } from './ListTitle/ListTitle';
import { ListContainer } from './styled';

type OnClickFuncType = (
    user: React.ChangeEvent<HTMLDivElement>
) => MouseEventHandler<HTMLDivElement>;

export interface IArrButton {
    item: JSX.Element;
    onClickFunc: OnClickFuncType;
}

interface IProps {
    listColumns: IListColumns[];
    listData?: IUser[];
    arrButton?: IArrButton[];
}

export const List: FC<IProps> = ({ listColumns, listData, arrButton }) => {
    return (
        <ListContainer>
            <ListTitle listColumns={listColumns} />
            {listData?.map((user) => (
                <ListElement
                    key={user.userID}
                    listColumns={listColumns}
                    user={user}
                    arrButton={arrButton}
                />
            ))}
        </ListContainer>
    );
};
