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

interface IPrors {
    sortParameter?:string ;
    sortHandler:(sortField:string)=> MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    listData?: IUser[];
    arrButton?: IArrButton[];
    sortParameterName?:string ;
}

export const List: FC<IPrors> = (
    { listColumns, listData, arrButton, sortHandler, sortParameter, sortParameterName }) => {
    return (
        <ListContainer>
            <ListTitle
                sortParameterName={sortParameterName}
                sortParameter={sortParameter}
                listColumns={listColumns} 
                sortHandler={sortHandler}
            />
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
