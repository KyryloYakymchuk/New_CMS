import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface IMenuProps {
    statusmenu?: boolean;
    isItemSelected?:boolean;
    height?: string;
    padding?: string;
}

export const NavbarContainer = styled.div<IMenuProps>`
  padding-top: 50px;
  height: 100vh;
  position: sticky;
  display: block;
  overflow-x: hidden;
  width: ${({ statusmenu }) => (statusmenu && '0px' )};
  transition-duration: 0.3s;
  top: 0;
`;
export const NavbarItem = styled(NavLink)<IMenuProps>`
  border-right: 1px solid rgba(96, 96, 96, 0.273);
  font-size: 20px;
  padding-left: ${({ padding }) => padding};
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  
`;

export const Title = styled.div<IMenuProps>`
  padding: 9px 0 9px 15px;
  display: flex;
  align-items: center;
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
  height: ${({ isItemSelected, height }) =>
        isItemSelected ? height : '42px'};
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
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;


export const style = {
    backgroundColor: '#f03254',
    color: 'white'
};
