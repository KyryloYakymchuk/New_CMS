export const offsetGenerator = (
    currentPage: number,
    deleteRequestStatus: boolean,
    count: number
) => {
    let offset;

    if (currentPage === 0) {
        offset = 0;
    } else {
        offset = (currentPage - 1) * 10;
    }
    if (deleteRequestStatus && offset + 1 === count && offset !== 0) {
        offset -= 10;
    }
    return offset;
};
