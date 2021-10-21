import styled from "styled-components";

export const ListElementContainer = styled.div`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & :last-child {
    /* width: 23%; */
  }
  & > div {
    padding-left: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
`;
