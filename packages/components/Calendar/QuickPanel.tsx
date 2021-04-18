/*
 * @Author: Yue·jian
 * @Date: 2021-01-15 11:10:06
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-01-15 11:20:31
 * @Description: 文件用途描述
 */
import React from 'react';
import dayjs from 'dayjs';
import { getWeekDay } from './utils';
import { IQuickPanelProps } from './types';
import { ActiveCalendarText, CalendarText, CalendarHead } from './style';
import { PlayIcon, OrderIcon } from '@qunhe/muya-theme-up';

export default function QuickPanel(props: IQuickPanelProps) {
    const { weekdays, curDate, handleChange, onOpen } = props;
    return (
        <CalendarHead>
            {weekdays.map((e: string, i: number) => {
                let Item = CalendarText;
                if (dayjs(curDate).format('YYYY-MM-DD') === dayjs(e).format('YYYY-MM-DD')) {
                    Item = ActiveCalendarText;
                }
                return (
                    <Item key={i} onClick={() => handleChange?.(e)}>
                        <p>{getWeekDay(e)}</p>
                        <p>{dayjs(e).date()}</p>
                    </Item>
                );
            })}
            <CalendarText
                onClick={onOpen}
                style={{
                    borderRadius: '0px',
                    boxShadow: '-1px 0px #f1f1f1'
                }}
            >
                <OrderIcon style={{ fontSize: '14px', color: '#313438' }} />
                <PlayIcon
                    style={{ transform: 'rotateZ(90deg)', fontSize: '10px', color: ' #C8CBD0' }}
                />
            </CalendarText>
        </CalendarHead>
    );
}
