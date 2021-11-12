import { FC, MouseEventHandler } from 'react';
import { IListColumns, OnClickFuncType } from '@interfaces/types';
import { ListElement } from './ListElement/ListElement';
import { ListTitle } from './ListTitle/ListTitle';
import { ListContainer } from './styled';
import { Loader } from '@components/Loader/Loader';

export interface IArrButton {
    item: JSX.Element;
    onClickFunc: OnClickFuncType;
}

interface IPrors {
    sortType?: string;
    sortHandler: (sortField: string) => MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    //!Always diferent data
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
            {/* Always diferent data */}
            {listData?.map((data:any, index:number) => (
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
