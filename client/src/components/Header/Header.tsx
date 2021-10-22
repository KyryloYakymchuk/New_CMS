import { FC } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { setModalStatusAction } from '@redux/actions/modal';
// import { statusAction } from '@redux/actions/menuStatus';
// import { menuStatusSelector } from '@redux/selectors/menuStatus';

import { Icons } from '@utils/constants/icon';
import { AuthRoutes } from '@utils/enums/routes';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

import { ModalConfirm } from '@components/Modal/Modal_Confirm_Submit/ModalConfirm';

import {
    HeaderContainer,
    HeaderTitle,
    TitleContainer,
    TitleItem
} from './style/style';


interface Props {
    title: string;
}

export const Header: FC<Props> = ({ title }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    //     const statusmenu = useTypedSelector( ({ menuReducer }) => menuReducer.status);
    const isModalOpen = useTypedSelector(({ modalStatus }) => modalStatus?.modal);


    // const handleClickBurger = () => {
    //     dispatch(setModalStatusAction(true));
    //     dispatch(statusAction(isModalOpen));
    // };

    const handleClickLogout = () => {
        dispatch(setModalStatusAction(true));
    };

    const handleAccept = () => {
        history.push(AuthRoutes.LOGIN);
        localStorage.removeItem('NewCMS_accessToken');
        dispatch(setModalStatusAction(false));
    };

    const handleClose = () => {
        dispatch(setModalStatusAction(false));
    };

    return (
        <>
            <HeaderContainer>
                {/* For mobile  */}
                {/* <div
          className={`icon-one ${!statusMenu && "active-one"}`}
          onClick={handleClickBurger}
        >
          <div className="hamburger hamburger-one"></div>
        </div> */}

                <TitleContainer>
                    <TitleItem>
                        <HeaderTitle>{t(title)}</HeaderTitle>
                    </TitleItem>
                    <TitleItem>
                        <Button
                            endIcon={Icons.LogoutIcon}
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
                isModalOpen={isModalOpen}
                message={'Are you sure you want to log out?'}
                handleAccept={handleAccept}
                handleClose={handleClose}
            />
        </>
    );
};
