import styled from "styled-components";

export const ListTitleContainer = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  border-bottom: 1px solid red;
  align-items: center;

  & > div {
    padding-left: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    :last-child {
      width: 23%;
    }
  }
`;
