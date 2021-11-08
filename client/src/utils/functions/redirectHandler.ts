import { History } from 'history';
export const redirectHandler = (
    page: number,
    pathname: string,
    search: string,
    history: History
) => {
    const query = new URLSearchParams(search);
    query.set('page', `${page + 1}`);
    history.push({
        pathname: pathname,
        search: query.toString()
    });
};
