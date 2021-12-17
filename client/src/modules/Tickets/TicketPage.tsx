import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icons } from '@utils/constants/icon';
import { Buttons } from '@components/Button/Button';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { PageHeader, UserPageContainer } from '@modules/Users/styled';
import { useLocation } from 'react-router';
import { changeTicketStatusAction, getTicketByIDAction } from '@redux/actions/tickets';
import { currentTicketSelector } from '@redux/selectors/tickets';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { TicketContent } from '@components/TicketContent/TicketContent';
import { toPreviousPage } from '@utils/functions/historyBack';

export interface IRouterParams {
    page: string;
}
export const TicketPage: FC = () => {
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    const ticketID: string = pathname.split('/')[2];
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
    const currentTicketInfo = useAppSelector(currentTicketSelector)!;
    const changeTicketStatus = () => {
        setModalStatus(true);
        setModalMessage('Are you sure you want to close this ticket');
    };
    const handleAccept = () => {
        setModalStatus(false);
        dispatch(changeTicketStatusAction({ ticketID, ticketStatus: 'closed' }));
    };
    const handleClose = () => {
        setModalStatus(false);
    };

    useEffect(() => {
        dispatch(getTicketByIDAction(ticketID));
    }, [dispatch]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={'Add answer'}
                    type="button"
                    style="pinkButton"
                    onClickFunction={()=>setIsCommentFormVisible(true)}
                    icon={<Icons.PersonIcon />}
                />
                <Buttons
                    title={'Close ticket'}
                    type="button"
                    style="pinkButton"
                    onClickFunction={changeTicketStatus}
                    icon={<Icons.PersonIcon />}
                />
                <Buttons
                    title={'Cancel'}
                    type="button"
                    style="grayButton"
                    onClickFunction={toPreviousPage}
                    icon={<Icons.PersonIcon />}
                />
            </PageHeader>
            <TicketContent
                currentTicket={currentTicketInfo}
                isCommentFormVisible={isCommentFormVisible}
                setIsCommentFormVisible={setIsCommentFormVisible}
            />
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
