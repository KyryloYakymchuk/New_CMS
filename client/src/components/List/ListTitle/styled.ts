import styled from 'styled-components';
interface ISvgButton {
    sortType?: string | null;
}

export const ListTitleContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(150, 150, 150,0.3);
  align-items: center;

  & > div {
    cursor: pointer;
    padding-left: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    :last-child {
      width: 30%;
      justify-content: flex-end;
    }
  }
`;
export const SvgButton = styled.div<ISvgButton>`
  display: flex;
  align-items: center;
  transform: ${({ sortType }) => (sortType === 'ascending' ? 'rotate(0.5turn)' : 'rotate(0turn)')};
`;
