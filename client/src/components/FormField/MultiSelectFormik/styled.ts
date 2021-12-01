import styled from 'styled-components';

export const SelectBlock = styled.div`
    display: inline-block;
    position: relative;
    width: 35%;
    padding: 0;
    margin: 0px 10px 40px 5px;
`;
export const SelectTitle = styled.div`
    position: absolute;
    left: 13px;
    top: -7px;
    font-size: 12px;
    font-weight: 200;
    color: gray;
    background-color: aliceblue;
    padding: 0 3px;
    z-index: 100;
`;

export const multiSelectStyles = {
    control: (styles: any, state: any) => {
        return {
            ...styles,
            width: '100%',
            minHeight: '55px',
            borderRadius: '4px',
            paddingLeft: '8px',
            padding: state.isFocused ? '1px' : '2px',
            fontFamily: 'Raleway',
            fontWeigth: '200',
            backgroundColor: 'transparent',
            boxShadow: '0 0 0 1px solid transparent',
            cursor: 'pointer',

            border: state.isFocused ? '2px solid rgb(122, 122, 122)' : '',
            '&:hover': { border: state.isFocused ? '' : '1px solid black' }
        };
    },
    option: (styles: any) => {
        return {
            ...styles,
            textAlign: 'start',
            color: 'black',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'Raleway',
            fontWeigth: '200'
        };
    },
    valueContainer: (styles: any) => {
        return {
            ...styles,
            margin: '5px',
            padding: 0,
            backgroundColor: 'transparent'
        };
    },
    loadingIndicator: (styles: any) => {
        return {
            ...styles,
            display: 'none'
        };
    }
};
//idk how typed this
