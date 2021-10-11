import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface IMenuProps {
  statusMenu?: boolean;
  pickedId?: number;
  itemId?: number;
}

export const NavbarContainer = styled.div<IMenuProps>`
  background-color: rgb(96, 96, 96);
  padding-top: 50px;
  height: 100vh;
  position: sticky;
  display: block;
  overflow-x: hidden;
  width: ${({ statusMenu }) => (statusMenu ? "0px" : "220px")};
  transition-duration: 0.3s;
  top: 0;
`;
export const NavbarItem = styled(NavLink)<IMenuProps>`
  font-size: 20px;
  margin: 15px 0;
  padding-left: 15px;
  cursor: pointer;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;

  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: 200;
  background-color: ${({ pickedId, itemId }) =>
    pickedId === itemId ? "#aaaaaa52" : "transparent"};
  &:hover {
    background-color: #ffffff45;
    color: black;
  }
  span {
    text-align: start;
    width: 170px;
  }
`;
