import { MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { Loader } from '@components/Loader/Loader';
import { ListElement } from './ListElement/ListElement';
import { ListTitle } from './ListTitle/ListTitle';
import { ListContainer } from './styled';
import Tooltip from '@mui/material/Tooltip';

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
    title?: string;
}

export function List<T>({
    listColumns,
    listData,
    arrButton,
    sortHandler,
    sortType,
    sortColumn,
    onDoubleClick,
    title
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
                <Tooltip placement="top" arrow title={title || ''}>
                    <div onDoubleClick={onDoubleClick ? onDoubleClick(data) : undefined}>
                        <ListElement
                            key={index}
                            listColumns={listColumns}
                            data={data}
                            arrButton={arrButton}
                        />
                    </div>
                </Tooltip>
            )) || <Loader />}
        </ListContainer>
    );
}
