import styled from 'styled-components';

export const ListElementContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  color: rgba(150, 150, 150,0.9);
   :not(:last-child) {
    border-bottom: 1px solid rgba(150, 150, 150,0.3);
  }
  :hover {
    background-color: rgba(150, 150, 150,0.2);
    color: black;
  }
  & > div {
    padding-left: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  & > :last-child {
    width: 30%;
  }
  & > :first-child {
    color: black;
  }
  
 
`;
export const ButtonBlock = styled.div``;
export const Button = styled.div`
  cursor: pointer;
  margin: 0 5px;
  & > :hover {
    color: grey;
  }
`;
