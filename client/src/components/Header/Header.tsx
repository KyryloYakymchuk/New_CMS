import { FC, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { statusAction } from "@redux/actions/menuStatus";
import { menuStatusSelector } from "@redux/selectors/menuStatus";

import LogoutIcon from "@mui/icons-material/Logout";

import { ModalConfirm } from "@components/Modal/Modal_Confirm_Submit/ModalConfirm";

import {
  HeaderContainer,
  HeaderTitle,
  HeaderIcon,
  TitleContainer,
  TitleItem,
} from "./style/style";

interface Props {
  title: string;
  icon: any;
}

export const Header: FC<Props> = ({ title, icon }) => {
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
    history.push("./auth/login");
    localStorage.removeItem("NewCMS_accessToken");
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <HeaderContainer>
        <div
          className={`icon-one ${!statusMenu && "active-one"}`}
          onClick={handleClickBurger}
        >
          <div className="hamburger hamburger-one "></div>
        </div>

        <TitleContainer>
          <TitleItem>
            <HeaderIcon>{icon}</HeaderIcon>
            <HeaderTitle>{title}</HeaderTitle>
          </TitleItem>
          <TitleItem>
            <Button
              endIcon={<LogoutIcon fontSize="large" />}
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
