import { FC, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { statusAction } from "@redux/actions/menuStatus";
import { menuStatusSelector } from "@redux/selectors/menuStatus";

import { Icons } from "@utils/constants/MenuItem/icon";
import { AuthRoutes } from "@utils/enums/routes";

import { ModalConfirm } from "@components/Modal/Modal_Confirm_Submit/ModalConfirm";

import {
  HeaderContainer,
  HeaderTitle,
  TitleContainer,
  TitleItem,
} from "./style/style";

interface Props {
  title: string;
}

export const Header: FC<Props> = ({ title }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const statusMenu = useSelector(menuStatusSelector);

  const history = useHistory();

  const handleClickBurger = () => {
    setOpenMenu(!openMenu);
    dispatch(statusAction(openMenu));
  };

  const handleClickLogout = () => {
    setOpenModal(true);
  };

  const handleAccept = () => {
    history.push(AuthRoutes.LOGIN);
    localStorage.removeItem("NewCMS_accessToken");
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
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
        openModal={openModal}
        message="Are you sure you want to log out? "
        handleAccept={handleAccept}
        handleClose={handleClose}
      />
    </>
  );
};