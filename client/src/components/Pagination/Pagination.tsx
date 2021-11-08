import { redirectHandler } from '@utils/functions/redirectHandler';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router';
import { StyledPaginateContainer } from './styled';

interface IProps {
    count: number;
    limit: number;
}
interface IData {
    selected: number;
}
export const Pagination: FC<IProps> = ({ count, limit }) => {
    let { search, pathname } = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(search);
    const page = Number(query.get('page'));

    const handlePageClick = (data: IData) => {
        redirectHandler(data?.selected, pathname, search, history);
    };

    return (
        <StyledPaginateContainer>
            {count < 10 ? null : (
                <ReactPaginate
                    pageCount={count / limit}
                    marginPagesDisplayed={1.2}
                    pageRangeDisplayed={3}
                    forcePage={page === 0 ? 0 : page - 1}
                    containerClassName="pagination"
                    pageClassName="pagination-page"
                    pageLinkClassName="pagination-link"
                    nextLinkClassName="pagination-next"
                    previousLinkClassName="pagination-prev"
                    activeClassName="pagination-active"
                    breakClassName="pagination-page"
                    breakLinkClassName="pagination-link"
                    onPageChange={handlePageClick}
                />
            )}
        </StyledPaginateContainer>
    );
};
