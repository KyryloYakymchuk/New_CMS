import React, { FC, MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitle } from '@components/List/ListTitle/ListTitle';
import { ListContainer } from '@components/List/styled';
import { ListDDElement } from './ListElement/ListDDElement';

type OnClickFuncType = (
    value: React.ChangeEvent<HTMLDivElement>
) => MouseEventHandler<HTMLDivElement>;

export interface IArrButton {
    item: JSX.Element;
    onClickFunc: OnClickFuncType;
}

interface IPrors {
    sortType?: string;
    sortHandler: (sortField: string) => MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    listData?: any;
    arrButton?: IArrButton[];
    sortColumn?: string;
}

export const ListDD: FC<IPrors> = ({
    listColumns,
    listData,
    arrButton,
    sortHandler,
    sortType,
    sortColumn
}) => {
    return (
        <ListContainer>
            <ListTitle
                sortColumn={sortColumn}
                sortType={sortType}
                listColumns={listColumns}
                sortHandler={sortHandler}
            />
            {listData?.map((data:any, index:any) => (
                <ListDDElement
                    key={index}
                    listColumns={listColumns}
                    data={data}
                    arrButton={arrButton}
                />
            ))}         
        </ListContainer>
    );
};