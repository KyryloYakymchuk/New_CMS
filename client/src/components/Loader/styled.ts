import styled from 'styled-components';

export const LoaderBlock = styled.div`
    height: 80px;
    position: absolute;
    top: 50%;
    left: 55%;
    // right: 0;
    margin: -30px auto 0;
    text-align: center;
    & > div {
        margin-right: 7px;
        background-color: gray;
        height: 100%;
        width: 6px;
        display: inline-block;

        animation: loader-3 1.2s infinite ease-in-out;
    }
    @keyframes loader-3 {
        0%,
        40%,
        100% {
            transform: scaleY(0.4);
        }
        20% {
            transform: scaleY(1);
        }
    }
`;

export const LoaderItem2 = styled.div`
    animation-delay: -1.1s !important;
`;
export const LoaderItem3 = styled.div`
    animation-delay: -1s !important;
`;
export const LoaderItem4 = styled.div`
    animation-delay: -0.9s !important;
`;
export const LoaderItem5 = styled.div`
    animation-delay: -0.8s !important;
`;
