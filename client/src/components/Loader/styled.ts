import styled from 'styled-components';

export const LoaderBlock = styled.div`
    height: 80px;
    position: absolute;
    top: 50%;
    left: 55%;
    margin: -30px auto 0;
    text-align: center;
    & > div {
        margin-right: 7px;
        background-color: gray;
        height: 100%;
        width: 6px;
        display: inline-block;

        animation: loader 1.2s infinite ease-in-out;
    }
    @keyframes loader {
        0%,
        40%,
        100% {
            transform: scaleY(0.4);
        }
        20% {
            transform: scaleY(1);
        }
    }
    & :nth-child(2) {
        animation-delay: -1.1s;
    }
    & :nth-child(3) {
        animation-delay: -1s;
    }
    & :nth-child(4) {
        animation-delay: -0.9s;
    }
    & :nth-child(5) {
        animation-delay: -0.8s;
    }
`;
