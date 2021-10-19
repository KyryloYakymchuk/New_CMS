import styled from "styled-components";

export const HeaderContainer = styled.div`
  color: black;
  font-size: 25px;
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;

  .hamburger {
    top: 50%;
    left: 15%;
    width: 30px;
    height: 2px;
    background: #fcfcfc;
    position: absolute;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }

  .hamburger:before {
    top: -8px;
  }

  .hamburger:after {
    top: 8px;
  }

  /* Icon 1 */
  .icon-one {
    position: absolute;
    width: 65px;
    height: 60px;
    cursor: pointer;
  }

  .hamburger-one:before,
  .hamburger-one:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 2px;
    background: #fcfcfc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }

  .icon-one.active-one .hamburger-one {
    background: rgba(0, 0, 0, 0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
  }

  .icon-one.active-one .hamburger-one:before {
    top: 0;
    transform: rotate(45deg);
  }

  .icon-one.active-one .hamburger-one:after {
    top: 0;
    transform: rotate(135deg);
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const HeaderTitle = styled.div`
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
  justify-content: space-between;
  width: 100%;
`;
export const TitleItem = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderIcon = styled.div`
  margin-right: 15px;
`;
