import { MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitle } from '@components/List/ListTitle/ListTitle';
import { ListContainer } from '@components/List/styled';
import { ListDDElement } from './ListElement/ListDDElement';
import { formaterFieldListData } from '@utils/functions/formaterFieldListData';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { getItemStyle } from '@utils/styles/dragListElement';
import { useTranslation } from 'react-i18next';

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
    onDragEnd: (result: any) => void;
}

export function ListDD<T>({
    listColumns,
    listData,
    arrButton,
    sortHandler,
    sortType,
    sortColumn,
    onDragEnd
}: IProps<T>) {
    const { t } = useTranslation();

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
                                        <div
                                            title={t('Hold to change the order')}
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
