import { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { setModalMessageAction, setModalStatusAction } from '@redux/actions/modal';
import { Icons } from '@utils/constants/icon';
import { AuthRoutes } from '@utils/enums/RoutesPath';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { HeaderContainer, HeaderTitle, TitleContainer, TitleItem } from './styled';
import { tokenServise } from '@services/tokenServise';
import { ModalButton } from '@components/Modal/ModalButton';

interface Props {
    title: string;
}

export const Header: FC<Props> = ({ title }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const [modalStatus, setModalStatus] = useState(false);

    /* For future mobile version  */
    //     const statusmenu = useTypedSelector( ({ menuReducer }) => menuReducer.status);
    // const handleClickBurger = () => {
    //     dispatch(setModalStatusAction(true));
    //     dispatch(statusAction(isModalOpen));
    // };

    const handleClickLogout = () => {
        dispatch(setModalMessageAction('Are you sure you want to log out?'));
        setModalStatus(true);
    };

    const handleAccept = () => {
        tokenServise.removeToken();
        history.push(AuthRoutes.LOGIN);
        dispatch(setModalStatusAction(false));
    };

    const handleClose = () => {
        setModalStatus(false);
    };

    return (
        <>
            <HeaderContainer>
                {/* For future mobile version  */}
                {/*<div*/}
                {/*    className={`icon-one ${!statusMenu && 'active-one'}`}*/}
                {/*    onClick={handleClickBurger}*/}
                {/*>*/}
                {/*    <div className="hamburger hamburger-one"></div>*/}
                {/*</div> */}

                <TitleContainer>
                    <TitleItem>
                        <HeaderTitle>{t(title)}</HeaderTitle>
                    </TitleItem>
                    <TitleItem>
                        <Button
                            endIcon={<Icons.LogoutIcon />}
                            size="large"
                            color="inherit"
                            variant="text"
                            type="button"
                            onClick={handleClickLogout}
                        >
                            {t('Logout')}
                        </Button>
                    </TitleItem>
                </TitleContainer>
            </HeaderContainer>
            <ModalConfirm
                handleAccept={handleAccept}
                handleClose={handleClose}
                modalStatus={modalStatus}
            >
                <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
            </ModalConfirm>
        </>
    );
};
