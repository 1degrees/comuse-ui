/*
 * @Author: Yue·jian
 * @Date: 2021-01-12 14:49:27
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-08 19:35:29
 * @Description: 文件用途描述
 */
import dayjs from 'dayjs';

export const weeks = ['一', '二', '三', '四', '五', '六', '日'];

/**
 * 判断是否为同一周，
 * 因为1970年1月1 是周4   所以（天数+4）/7 取整 就是周数  如果相同就是同一周反之就不是
 * */
function isSameWeek(old: dayjs.Dayjs, now: dayjs.Dayjs) {
    let oneDayTime = 1000 * 60 * 60 * 24;
    let old_count = parseInt(String(old.toDate().getTime() / oneDayTime), 10);
    let now_other = parseInt(String(now.toDate().getTime() / oneDayTime), 10);
    return parseInt(String((old_count + 4) / 7), 10) === parseInt(String((now_other + 4) / 7), 10);
}

/**
 * 获取日历月展示列表
 * @param y 年
 * @param m 月
 */
export function getMonthDateList(y: number, m: number) {
    const year = y;
    const month = m - 1;
    let list = [];
    const now = new Date(year, month);
    const monthEnd = new Date(year, month + 1, 0); // 当月最后一天
    const lastMonthEnd = new Date(year, month, 0); // 上月最后一天
    const firstDay = now.getDay() === 0 ? 6 : now.getDay() - 1; // 现在是从周一开始了，这里周一的返回值是 1
    const mEDate = monthEnd.getDate();
    const lMEDate = lastMonthEnd.getDate();
    // 计算上月出现在日历中的日期
    for (let i = 0; i < firstDay; i++) {
        const tempM = month > 0 ? month : 12;
        const tempY = month > 0 ? year : year - 1;
        const strMonth = tempM < 10 ? `0${tempM}` : tempM;
        list.unshift(`${tempY}-${strMonth}-${lMEDate - i}`);
    }
    // 当月
    for (let i = 1; i < mEDate + 1; i++) {
        const strI = i < 10 ? '0' + i : i;
        const tempM = month + 1;
        const strMonth = tempM < 10 ? `0${tempM}` : tempM;
        list.push(`${year}-${strMonth}-${strI}`);
    }
    const tempLen = 42 - list.length;
    // 下月
    for (let i = 1; i < tempLen + 1; i++) {
        const strI = i < 10 ? '0' + i : i;
        const tempM = month + 2 < 13 ? month + 2 : 1;
        const tempY = month + 2 < 13 ? year : year + 1;
        const strMonth = tempM < 10 ? `0${tempM}` : `${tempM}`;
        list.push(`${tempY}-${strMonth}-${strI}`);
    }
    return list;
}

/**
 * 获取日历周展示列表
 */
export function getWeekDataList(date: dayjs.Dayjs) {
    const list = [];
    for (let i = 0; i < 7; i++) {
        list.push(formatDate(date.add(i, 'day')));
    }
    return list;
}

/**
 * @name convertDyadicArray 一维数组转换为二维数组
 * @param {Array} arr
 * @param {Number} row
 * @author Sven
 * @example convertDyadicArray([2,3,4,5,6,7], 3) => [[2,3],[4,5],[6,7]]
 */
export function convertDyadicArray(arr: Array<string>, row: number) {
    let dyadicArray = [];
    const col = arr.length / row;
    for (let i = 0; i < row; i++) {
        dyadicArray.push(arr.slice(i * col, (i + 1) * col));
    }
    return dyadicArray;
}

/**
 * 日期转化为年月日的形式
 */
export function formatDate(date: dayjs.Dayjs) {
    return date.format('YYYY-MM-DD');
}

/**
 * 获取最近的一个周一，日期之前
 */
export function getRecentlyMonday(date: string) {
    let dayDate = dayjs(date);
    while (dayDate.day() !== 1) {
        dayDate = dayDate.add(-1, 'day');
    }
    return formatDate(dayDate);
}

/**
 * 获取最近的一个周日
 */
export function getRecentlySunday(date: string) {
    let dayDate = dayjs(date);
    while (dayDate.day() !== 6) {
        dayDate = dayDate.add(1, 'day');
    }
    return formatDate(dayDate);
}

/**
 * 获取日历标题的一个显示
 */
export function getCalendarTitle(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    if (start.month() === end.month()) {
        // 当月的
        return `${start.month() + 1}月 ${start.format('DD')}日-${end.format('DD')}日`;
    } else {
        // 跨月的
        return `${start.format('MM月DD日')}-${end.format('MM月DD日')}`;
    }
}

/**
 * 获取日期数据
 */
export function getCalendarData(
    showMonth: boolean,
    activeDate: string,
    fromDate: string,
    toDate: string
) {
    // 计算得到一个日历的列表数据
    const dataList: Array<string[][]> = [];
    const dataKeyList: Array<string> = [];
    let count = 0;
    let page = 0;
    let date = dayjs(fromDate);
    const active = dayjs(activeDate);
    if (showMonth) {
        while (!date.isAfter(toDate)) {
            // 是否是当前的月的
            if (date.isSame(active, 'month')) {
                page = count;
            }
            dataKeyList.push(formatDate(date));
            dataList.push(convertDyadicArray(getMonthDateList(date.year(), date.month() + 1), 6));
            count++;
            date = date.add(1, 'month');
        }
    } else {
        while (!date.isAfter(toDate)) {
            if (isSameWeek(date, active)) {
                page = count;
            }
            dataKeyList.push(formatDate(date));
            dataList.push(convertDyadicArray(getWeekDataList(date), 1));
            count++;
            date = date.add(1, 'week');
        }
    }
    return {
        page,
        dataKeyList,
        dataList
    };
}

/**
 * 获取得到一个当前页
 * @param showMonth 是否是月份的
 * @param activeDate 当前选中的日期
 * @param fromDate 开始日期
 * */
export function getActivePage(showMonth: boolean, activeDate: string, fromDate: string) {
    let page = 0;
    let count = 0;
    let date = dayjs(fromDate);
    let loop = true;
    const active = dayjs(activeDate);
    const unit = showMonth ? 'month' : 'week';
    while (loop) {
        if (unit === 'month' && date.isSame(active, 'month')) {
            page = count;
            loop = false;
        } else if (unit === 'week' && isSameWeek(date, active)) {
            page = count;
            loop = false;
        }
        count++;
        date = date.add(1, unit);
    }
    return page;
}

/**
 * 获取日期是周几
 * @param time 是否是月份的
 * */
export function getWeekDay(time: any) {
    if (formatDate(dayjs(time)) === formatDate(dayjs())) {
        return '今日';
    } else {
        let index = dayjs(time).day() - 1;
        return `周${weeks[index === -1 ? 6 : index]}`;
    }
}

/**
 * 获取指定日期的一周时间
 * @param time 指定日期
 * */
export function getWeeksDay(time: any): string[] {
    const days = [];
    let index = dayjs(time).day();
    for (let i = 0; i < 7; i++) {
        days.push(formatDate(dayjs(time).add(i - index, 'day')));
    }
    return days;
}

/**
 * 获取指定日期N日内的所有日期
 * @param time 指定日期
 * @param num N日内
 * */
export function getDaysFromDay(time: any, num: number): string[] {
    const days = [];
    for (let i = 0; i < num; i++) {
        days.push(formatDate(dayjs(time).add(i, 'day')));
    }
    return days;
}
