export const handleListSort = (
    currentSortField: string,
    sortingTypeIdx: number,
    sortFildName: string
) => {
    let currSortingTypeIdx = sortingTypeIdx;
    let currentSortParams = {};

    if (currentSortField !== sortFildName) {
        currSortingTypeIdx = 0;
    }
    if (currSortingTypeIdx === 2) {
        currSortingTypeIdx = 0;
    } else {
        currentSortParams = {
            sortField: currentSortField,
            sortParameter: currSortingTypeIdx ? 'ascending' : 'descending'
        };
        currSortingTypeIdx++;
    }
    return { currentSortParams, currSortingTypeIdx };
};
