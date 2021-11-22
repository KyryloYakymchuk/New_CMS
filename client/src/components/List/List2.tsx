import { MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { Loader } from '@components/Loader/Loader';
import { ListTitle } from './ListTitle/ListTitle';
import { ListContainer } from './styled';

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
    arrButton?: IArrButton<T>[];
    sortColumn?: string;
    onDoubleClick?: (data: T) => MouseEventHandler<HTMLDivElement>;
    children: (data: T) =>  JSX.Element ;
}

export function List2<T>({
    listColumns,
    listData,
    sortHandler,
    sortType,
    sortColumn,
    children
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
            {listData?.map((data: any, index: number) => (
                <div key={index}>{children(data)}</div>
            )) || <Loader />}
        </ListContainer>
    );
}
