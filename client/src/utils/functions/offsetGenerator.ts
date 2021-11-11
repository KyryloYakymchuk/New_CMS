export const offsetGenerator = (currentPage: number, isDeleteItem: boolean, count: number) => {
    let offset;
    if (currentPage === 0) {
        offset = 0;
    } else {
        offset = (currentPage - 1) * 10;
    }
    if (isDeleteItem && offset + 1 === count && offset !== 0) {
        offset -= 10;
    }
    // return to the previous page when deleting last item
    return offset;
};
