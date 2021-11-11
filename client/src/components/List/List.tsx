import React, { FC, MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListElement } from './ListElement/ListElement';
import { ListTitle } from './ListTitle/ListTitle';
import { ListContainer } from './styled';
import { Loader } from '@components/Loader/Loader';

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

export const List: FC<IPrors> = ({
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
                <ListElement
                    key={index}
                    listColumns={listColumns}
                    data={data}
                    arrButton={arrButton}
                />
            )) || <Loader />}
        </ListContainer>
    );
};
