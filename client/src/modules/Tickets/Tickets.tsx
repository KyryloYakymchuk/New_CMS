import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { tiketsListColumns } from '@utils/constants/ListsData/ListsData';
import { Icons } from '@utils/constants/icon';
import { useTranslation } from 'react-i18next';
import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';

import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { LIMIT } from '@utils/constants/Limit';
import { ListBlock, PageHeader, UserPageContainer } from '@modules/Users/styled';
import { deleteTicketAction, getAllTicketsAction } from '@redux/actions/tickets';
import { allTicketsCountSelector, allTicketsSelector } from '@redux/selectors/tickets';
import { ISetTicketsPayload } from '@redux/types/tickets';
import { useHistory } from 'react-router';
import { ProtectedRoutes } from '@utils/enums/RoutesPath';

export interface IRouterParams {
    page: string;
}
export const Tickets: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    //let { search, pathname } = useLocation();
    //const query = new URLSearchParams(search);
    //const currentPage = Number(query.get('page'));
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState('');
    const [deleteRequestStatus, setDeleteRequestStatus] = useState(false);
    const [deleteWatcher, setDeleteWatcher] = useState(false);
    const [deleteID, setDeleteID] = useState('');
    const allTickets = useAppSelector(allTicketsSelector)!;
    const allTicketsCount = useAppSelector(allTicketsCountSelector)!;

    function deleteTicketClick<T extends ISetTicketsPayload>(value: T) {
        return () => {
            setDeleteID(value?.ticketID!);
            setModalStatus(true);
            setModalMessage('Are you sure you want to delete thit ticket?');
        };
    }

    function openTicketInfo<T extends ISetTicketsPayload>(value: T) {
        return () => {
            console.log(value);
            history.push(`/ticket/${value.ticketID}`);
        };
    }

    const createUserClick = () => {
        history.push(ProtectedRoutes.CREATE_TICKET);
    };

    const arrUserListButton = [
        { item: <Icons.DeleteIcon />, onClickFunc: deleteTicketClick }
    ];

    const handleAccept = () => {
        setModalStatus(false);
        setDeleteRequestStatus(true);
        setDeleteWatcher(!deleteWatcher);
    };
    const handleClose = () => {
        setModalStatus(false);
    };

    useEffect(() => {
        if (deleteRequestStatus) {
            dispatch(
                deleteTicketAction({ ticketID: deleteID, query: { offset: 0, limit: LIMIT } })
            );
        } else {
            dispatch(getAllTicketsAction({ offset: 0, limit: LIMIT }));
        }
    }, [dispatch, deleteWatcher]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={t('Create ticket')}
                    type="button"
                    style="pinkButton"
                    onClickFunction={createUserClick}
                    icon={<Icons.PersonIcon />}
                />
            </PageHeader>
            <ListBlock>
                <List
                    listColumns={tiketsListColumns}
                    listData={allTickets}
                    arrButton={arrUserListButton}
                    onDoubleClick={openTicketInfo}
                />
                <Pagination count={Number(allTicketsCount)} limit={LIMIT} />
            </ListBlock>
            <ModalConfirm
                handleAccept={handleAccept}
                handleClose={handleClose}
                modalStatus={modalStatus}
                message={modalMessage}
            >
                <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
            </ModalConfirm>
        </UserPageContainer>
    );
};
