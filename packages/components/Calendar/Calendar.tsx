/*
 * @Author: Yue·jian
 * @Date: 2021-01-19 16:43:35
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-08 22:46:51
 * @Description: 文件用途描述
 */
import React from 'react';
import { pick } from 'lodash';
import { ICalendarProps } from './types';
import CalendarPanel from './Panel';
import QuickPanel from './QuickPanel';
import useCalendar from './useCalendar';
import { weeks } from './utils';
import { CalendarContainer } from './style';

export function Calendar(props: ICalendarProps) {
    const others = pick(props, ['className', 'style']);
    const {
        open,
        curDate,
        minDate,
        maxDate,
        weekdays,
        dataList,
        dataKeyList,
        renderDay,
        handleChange,
        handleClose,
        handleOpen
    } = useCalendar(props);
    return (
        <CalendarContainer {...others}>
            <QuickPanel
                curDate={curDate}
                weekdays={weekdays}
                onOpen={handleOpen}
                handleChange={handleChange}
            />
            <CalendarPanel
                open={open}
                curDate={curDate}
                dataList={dataList}
                dataKeyList={dataKeyList}
                weekTitle={weeks}
                handleChange={handleChange}
                minDate={minDate}
                maxDate={maxDate}
                renderDay={renderDay}
                onClose={handleClose}
            />
        </CalendarContainer>
    );
}
