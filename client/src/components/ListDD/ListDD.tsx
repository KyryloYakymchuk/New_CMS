import { MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitle } from '@components/List/ListTitle/ListTitle';
import { ListContainer } from '@components/List/styled';
import { ListDDElement } from './ListElement/ListDDElement';
import { formaterFieldListData } from '@utils/functions/formaterFieldListData';

export interface IArrButton<T> {
    item: JSX.Element;
    onClickFunc: (data: T) => VoidFunction;
}

interface IProps<T> {
    sortType?: string;
    sortHandler?: (sortField: string) => MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    //!Always diferent data
    listData?: any;
    arrButton: IArrButton<T>[];
    sortColumn?: string;
}

export function ListDD<T>({
    listColumns,
    listData,
    arrButton,
    sortHandler,
    sortType,
    sortColumn
}: IProps<T>) {
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
}
