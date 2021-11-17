import { FC, MouseEventHandler } from 'react';

import { IListColumns, OnClickFuncType } from '@interfaces/types';

import { ListTitle } from '@components/List/ListTitle/ListTitle';
import { ListContainer } from '@components/List/styled';
import { formaterFieldListData } from '@utils/functions/formaterFieldListData';

import { ListDDElement } from './ListElement/ListDDElement';

export interface IArrButton {
    item: JSX.Element;
    onClickFunc: OnClickFuncType;
}

interface IPrors {
    sortType?: string;
    sortHandler?: (sortField: string) => MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    //!Always diferent data
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
            {/* Always diferent data */}
            {formaterFieldListData(listData)?.map((data: any, index: number) => (
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
