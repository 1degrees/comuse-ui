import styled, { keyframes } from 'styled-components';

const open = keyframes`
    0% {
        display: block;
        bottom: -50vh;
    }
    1% {
        bottom: -50vh;
    }
    100% {
        bottom: 0;
    }
`;

export const CascaderContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
`;

export const InputWrapper = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .suffix {
        position: absolute;
        top: 12px;
        right: 24px;
        font-size: 14px;
        color: #dadde0;
    }
    span {
        font-size: 12px;
        color: #313438;
    }
`;

export const PanelContainer = styled.div`
    position: fixed;
    left: 50%;
    bottom: 0;
    width: 100%;
    height: 100%;
    max-width: 600px;
    transform: translate(-50%);
    z-index: 1001;
`;

export const PanelBg = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
`;

export const PanelContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    z-index: 2;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    &.open {
        animation: ${open} 0.4s linear;
    }
`;
export const PanelHeader = styled.div`
    display: block;
    width: 100%;
    height: 56px;
    line-height: 56px;
    border-radius: 8px 8px 0 0;
    text-align: center;

    svg {
        position: absolute;
        font-size: 12px;
        right: 20px;
        top: 20px;
        color: #c8cbd0;
    }
`;

export const PanelMenu = styled.div`
    width: 100%;
    height: calc(50vh - 56px);
`;

export const MenuContainer = styled.ul<any>`
    ${(props: any) => {
        const { level } = props;
        return `
            display: inline-block;
            margin: 0;
            padding: 0;
            height: 100%;
            vertical-align: top;
            z-index: 1;
            overflow-y: auto;
            background-color: ${level % 2 === 0 ? 'rgba(237, 238, 240, 0.5)' : '#FFFFFF'}
        `;
    }}
`;

export const ItemContainer = styled.li`
    position: relative;
    display: block;
`;

export const ItemWarpper = styled.div<any>`
    ${(props: any) => {
        const { level } = props;
        return `
            display: inline-block;
            min-width: 120px;
            height: 44px;
            padding: 0 12px;
            text-align: center;
            font-size: 13px;
            color: #313438;
            cursor: pointer;
            &.active {
                color: #1a7af8;
                background-color: ${level % 2 !== 0 ? '#fff' : 'transparent'}
            }
        `;
    }}
`;

export const ItemLabel = styled.span`
    display: inline-block;
`;
