import styled from "styled-components";

export const AuthContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 28.5%;
  margin-top: 5%;
  padding-bottom: 30px;
  border-radius: 16px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  background-color: white;
  @media (max-width: 1160px) {
    width: 50%;
    margin-top: 15%;
  }
  @media (max-width: 665px) {
    width: 70%;
    margin-top: 25%;
  }
`;

export const AuthTitle = styled.div`
  text-align: center;
  color: rgb(42, 42, 42);
  font-size: 26px;
  font-weight: 400;
  padding-top: 25px;
`;
