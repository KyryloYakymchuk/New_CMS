import styled from 'styled-components';

interface IStyledProps {
    today?: boolean;
    yesrerday?: boolean;
    pickerPosition?: number | string;
    hover?: boolean;
    datePickerValue?: boolean;
}

export const DatePickerWrapper = styled.div`
    width: 380px;
`;

export const DatePickerContainer = styled.div`
    background-color: white;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    width: 380px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 130px;
`;
export const Days = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
export const Month = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 12px 0 12px;
`;
export const Year = styled.span`
    color: gray;
    font-size: 18px;
`;
export const MontName = styled.div`
    font-size: 18px;
`;
export const MonthAction = styled.div`
    display: flex;
`;
export const MonthActionItem = styled.div`
    svg {
        margin: 0 5px;
        cursor: pointer;
        fill: grey;
    }
`;
export const Week = styled.div`
    display: flex;
    font-size: 16px;
`;
export const Day = styled.div<IStyledProps>`
    width: 30px;
    height: 30px;
    padding: 5px 5px;
    font-size: 16px;
    display: flex;
    align-items: center;
    border-radius: 100px;
    margin: 3px 7px;
    justify-content: center;
    user-select: none;
    ${({ yesrerday }) => yesrerday && 'color:lightgray;'}
    ${({ datePickerValue, today, pickerPosition }) =>
        pickerPosition !== '' &&
        (datePickerValue || today) &&
        'background-color:rgb(240, 50, 84);color:white;'}
    ${({ hover, pickerPosition, today, datePickerValue }) =>
        pickerPosition !== '' &&
        hover &&
        !today &&
        !datePickerValue &&
        '&:hover{background-color: aliceblue; cursor: pointer;}'}
`;
