/*
 * @Author: Yue·jian
 * @Date: 2021-01-19 16:43:35
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-02-22 15:15:08
 * @Description: 文件用途描述
 */
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { IDate, ICalendarProps } from './types';
import isBetween from 'dayjs/plugin/isBetween';
import {
    getWeeksDay,
    getDaysFromDay,
    getRecentlyMonday,
    getRecentlySunday,
    getCalendarData
} from './utils';

dayjs.extend(isBetween);

export default function useCascader(props: ICalendarProps) {
    const {
        value,
        onChange,
        renderDay,
        onOpen,
        onClose,
        defaultValue = dayjs().format('YYYY-MM-DD'),
        minDate = dayjs()
            .add(0, 'month')
            .format('YYYY-MM-DD'),
        maxDate = dayjs()
            .add(6, 'month')
            .format('YYYY-MM-DD')
    } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [val, setVal] = useState<IDate>(defaultValue);
    const today = useMemo(() => dayjs().format('YYYY-MM-DD'), []);
    const fromDate = useMemo(() => getRecentlyMonday(minDate as string), []);
    const toDate = useMemo(() => getRecentlySunday(maxDate as string), []);
    const curDate = useMemo(() => (value ? value : val), [value, val]);
    const weekdays = useMemo(() => {
        if (dayjs(curDate).isBetween(dayjs(today).add(-1, 'day'), dayjs(today).add(6, 'day'))) {
            return getDaysFromDay(today, 6);
        } else {
            return getWeeksDay(curDate).slice(0, 6);
        }
    }, [curDate, today]);
    const monthState = useMemo(() => getCalendarData(true, today, fromDate, toDate), []);
    const dataList: Array<string[][]> = useMemo(() => monthState.dataList, [monthState]);
    const dataKeyList: Array<string> = useMemo(() => monthState.dataKeyList, [monthState]);
    const handleChange = useCallback(
        (val: IDate) => {
            onChange?.(val);
            setVal(val);
        },
        [value, onChange]
    );
    const handleOpen = useCallback(() => {
        setOpen(true);
        onOpen?.();
    }, [onOpen]);

    const handleClose = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose]);

    return {
        open,
        curDate,
        minDate,
        maxDate,
        weekdays,
        dataList,
        dataKeyList,
        renderDay,
        setOpen,
        handleChange,
        handleOpen,
        handleClose
    };
}
