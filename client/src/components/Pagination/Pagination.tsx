import { IRouterParams } from '@modules/Users/UsersPage';
import React, { Dispatch, FC } from 'react';
import ReactPaginate from 'react-paginate';
import { generatePath, useHistory, useParams } from 'react-router';
import { StyledPaginateContainer } from './styled';

interface IProps {
    count: number;
    limit: number;
    page: number;
    setPage: Dispatch<React.SetStateAction<number>>;
}
interface IData {
    selected: number;
}
export const Pagination: FC<IProps> = ({ count, limit, page, setPage }) => {
    const history = useHistory();
    const handlePageClick = (data: IData) => {
        setPage(data.selected);
        history.push(
            generatePath('/users/:page', {
                page: `page=${data.selected + 1}`
            })
        );
    };
    const routerParams = useParams<IRouterParams>();
    const currentPage = +routerParams?.page?.split('=')[1] - 1;

    return (
        <StyledPaginateContainer>
            {count < 10 ? null : (
                <ReactPaginate
                    initialPage={currentPage ? currentPage : 0}
                    pageCount={count / limit}
                    marginPagesDisplayed={1.2}
                    pageRangeDisplayed={3}
                    forcePage={page}
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
