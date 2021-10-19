import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface IMenuProps {
  statusmenu?: boolean;
  pickedid?: number;
  itemid?: number;
  height?: string;
  paddingLeft?: string;
}

export const NavbarContainer = styled.div<IMenuProps>`
  padding-top: 50px;
  height: 100vh;
  position: sticky;
  display: block;
  overflow-x: hidden;
  width: ${({ statusmenu }) => (statusmenu ? "0px" : "220px")};
  transition-duration: 0.3s;
  top: 0;
`;
export const NavbarItem = styled(NavLink)<IMenuProps>`
  border-right: 1px solid rgba(96, 96, 96, 0.273);
  font-size: 20px;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  cursor: pointer;
  height: 45px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgb(127, 126, 143);
  font-size: 20px;
  font-weight: 200;
  &:hover {
    background-color: #aaaaaa52;
    color: black;
  }

  span {
    padding-left: 15px;

    text-align: start;
    width: 170px;
  }
`;

export const Title = styled.div<IMenuProps>`
  padding: 9px 0 9px 15px;

  &:hover {
    background-color: #aaaaaa52;
    color: black;
  }
`;

export const TitleNavbarSubItem = styled.div<IMenuProps>`
  border-right: 1px solid rgba(96, 96, 96, 0.273);
  font-size: 20px;
  cursor: pointer;
  overflow: hidden;
  height: ${({ pickedid, itemid, height }) =>
    pickedid === itemid ? height : "45px"};
  transition-duration: 0.3s;
  display: block;
  align-items: center;
  text-decoration: none;
  color: rgb(127, 126, 143);
  font-size: 20px;
  font-weight: 200;
  background-color: transparent;

  span {
    padding-left: 15px;

    text-align: start;
    width: 170px;
  }
`;
