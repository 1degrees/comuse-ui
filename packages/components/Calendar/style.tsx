import styled, { keyframes } from 'styled-components';
const open = keyframes`
    0% {
        display: flex;
        right: -100%;
    }
    1% {
        right: -100%;
    }
    100% {
        right: 0;
    }
`;
const close = keyframes`
    0% {
        right: 0;
    }
    99% {
        right: -100%;
    }
    100% {
        display: none;
        right: -100%;
    }
`;

export const CalendarContainer = styled.div`
    width: 100%;
    position: relative;
    height: 50px;
    background-color: #fff;
    z-index: 1001;
`;

export const CalendarHead = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    background-color: #fff;
    z-index: 1;
`;

export const CalendarText = styled.div`
    display: flex;
    flex-direction: column;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: #313438;
    cursor: pointer;
    p {
        height: 20px;
        margin: 0;
        padding: 0;
        &:nth-child(1) {
            margin: 4px 0;
            font-size: 10px;
            color: #787e87;
        }
        &:nth-child(2) {
            font-size: 12px;
            color: #313438;
        }
    }
`;

export const ActiveCalendarText = styled(CalendarText)`
    background-color: #1b90ff;
    color: white;
    p {
        color: white !important;
    }
`;

export const PanelContainer = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 600px;
    background-color: #fff;
    z-index: 1000;
    &.hide {
        display: none;
    }
    &.open {
        animation: ${open} 0.4s linear;
    }
    &.close {
        animation: ${close} 0.4s linear;
        animation-fill-mode: forwards;
    }
`;

export const Panel = styled.div`
    position: relative;
    width: 100%;
    padding-top: 80px;
    max-height: 100vh;
    overflow: auto;
`;

export const PannelHead = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 80px;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
    z-index: 1;
`;

export const Table = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
`;

export const Week = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 36px;
    align-items: center;
    justify-content: center;
`;

export const HeadTool = styled(Week)`
    display: flex;
    flex-direction: row;
    span {
        font-size: 14px;
        color: #313438;
    }
    svg {
        position: absolute;
        right: 12px;
        color: #c8cbd0;
    }
`;

export const WeekText = styled.div`
    display: flex;
    flex-direction: column;
    width: 14.285%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #313438;
`;

export const WeekendText = styled(WeekText)`
    color: #92989f;
`;

export const MonthTitle = styled.p`
    margin: 0;
    width: 100%;
    padding: 12px 16px;
    color: #333333;
`;

export const Month = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
`;

export const Day = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 36px;
`;

export const DayDetail = styled.div`
    display: flex;
    flex-direction: column;
    width: 14.285%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
`;

export const Normal = styled.div`
    color: #1b90ff;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
`;

export const Light = styled(Normal)`
    color: #1b90ff;
    background-color: rgba(237, 238, 240, 0.5);
    opacity: 0.3;
`;

export const Today = styled(Normal)`
    color: #1b90ff;
    background-color: rgba(26, 122, 248, 0.1);
`;

export const Active = styled(Normal)`
    background-color: #1b90ff;
    color: white;
    :hover {
        background-color: #1b90ff;
    }
`;

export const StatusNormal = styled.div`
    position: absolute;
    border-bottom: 2px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #1b90ff;
    bottom: 4px;
`;

export const StatusWarning = styled(StatusNormal)`
    background-color: #fdac00;
`;

export const StatusError = styled(StatusNormal)`
    background-color: #f54054;
`;

export const StatusSafe = styled(StatusNormal)`
    background-color: #1b90ff;
`;
