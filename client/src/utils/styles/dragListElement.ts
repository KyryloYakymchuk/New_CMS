export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? '#9696966d' : 'none',
    // styles we need to apply on draggables
    ...draggableStyle
});
