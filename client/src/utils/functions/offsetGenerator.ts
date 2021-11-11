import { redirectHandler } from '@utils/functions/redirectHandler';
import { History } from 'history';
export const offsetGenerator = (
    currentPage: number,
    isDeleteItem: boolean,
    count: number,
    pathname: string,
    search: string,
    history: History
) => {
    let offset;
    if (currentPage === 0) {
        offset = 0;
    } else {
        offset = (currentPage - 1) * 10;
    }
    if (isDeleteItem && offset + 1 === count && offset !== 0) {
        offset -= 10;
        redirectHandler(currentPage - 2, pathname, search, history);
    }
    // return to the previous page when deleting last item
    return offset;
};
