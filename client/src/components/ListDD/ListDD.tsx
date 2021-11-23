import { MouseEventHandler } from 'react';
import Tooltip from '@mui/material/Tooltip';

import { IListColumns } from '@interfaces/types';
import { ListTitle } from '@components/List/ListTitle/ListTitle';
import { ListContainer } from '@components/List/styled';
import { ListDDElement } from './ListElement/ListDDElement';
import { formaterFieldListData } from '@utils/functions/formaterFieldListData';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { getItemStyle } from '@utils/styles/dragListElement';

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
    onDragEnd: (result: DropResult) => void;
    title: string;
}

export function ListDD<T>({
    listColumns,
    listData,
    arrButton,
    sortHandler,
    sortType,
    sortColumn,
    onDragEnd,
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {/* Always diferent data */}
                            {formaterFieldListData(listData)?.map((data: any, index: number) => (
                                <Draggable key={data.id} draggableId={data.id} index={index}>
                                    {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
                                        <Tooltip placement="top" arrow title={title}>
                                            <div
                                                ref={innerRef}
                                                {...draggableProps}
                                                {...dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    draggableProps.style
                                                )}
                                            >
                                                <ListDDElement
                                                    listColumns={listColumns}
                                                    data={data}
                                                    arrButton={arrButton}
                                                />
                                            </div>
                                        </Tooltip>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </ListContainer>
    );
}
