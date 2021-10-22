import { FC } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { setModalStatusAction } from '@redux/actions/modal';
import { Icons } from '@utils/constants/icon';
import { AuthRoutes } from '@utils/enums/routes';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
// import { statusAction } from '@redux/actions/menuStatus';
// import { menuStatusSelector } from '@redux/selectors/menuStatus';
import {
    HeaderContainer,
    HeaderTitle,
    TitleContainer,
    TitleItem
} from './styled';

interface Props {
    title: string;
}

export const Header: FC<Props> = ({ title }) => {
    const dispatch = useDispatch();
    const history = useHistory();

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
                {/*<div*/}
                {/*    className={`icon-one ${!statusMenu && 'active-one'}`}*/}
                {/*    onClick={handleClickBurger}*/}
                {/*>*/}
                {/*    <div className="hamburger hamburger-one"></div>*/}
                {/*</div> */}

                <TitleContainer>
                    <TitleItem>
                        <HeaderTitle>{title}</HeaderTitle>
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
                            Logout
                        </Button>
                    </TitleItem>
                </TitleContainer>
            </HeaderContainer>
            <ModalConfirm
                isModalOpen={isModalOpen}
                message="Are you sure you want to log out? "
                handleAccept={handleAccept}
                handleClose={handleClose}
            />
        </>
    );
};
