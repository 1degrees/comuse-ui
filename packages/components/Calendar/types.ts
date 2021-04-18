/*
 * @Author: Yue·jian
 * @Date: 2021-01-12 15:27:17
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-08 11:22:10
 * @Description: 文件用途描述
 */

import dayjs from 'dayjs';
import { HTMLAttributes } from 'react';

export type HTMLCalendarAttributes = Omit<
    HTMLAttributes<HTMLDivElement>,
    'value' | 'defaultValue' | 'onChange'
>;

export type IDate = string | Date | dayjs.Dayjs;

export interface ICalendarProps extends HTMLCalendarAttributes {
    /**
     * 当前日期
     */
    value?: IDate;
    /**
     * 当前日期
     * @default 此刻
     */
    defaultValue?: string | Date | dayjs.Dayjs;
    /**
     * 当前选中日期的回调
     */
    onChange?: (date: IDate) => void;
    /*
     * 打开面板回调
     */
    onOpen?: () => void;
    /*
     * 关闭回调
     */
    onClose?: () => void;
    /**
     * 日历的最小日期，格式为 YYYY-MM-DD
     * @default 当前日期
     */
    minDate?: IDate;
    /**
     * 日历的最大日期，格式为 YYYY-MM-DD
     * @default 当前日期的后6个月
     */
    maxDate?: IDate;
    /**
     * 日历上的一个状态的显示，
     * 自定义渲染日历单个节点函数
     * @default defaultRender
     */
    renderDay?: (day: IDayProps) => React.ReactNode;
}

export interface IPanelProps {
    /**
     * 当前日期
     */
    curDate: IDate;
    /**
     * 当前日期数据集合
     */
    dataList: Array<string[][]>;
    /**
     * 当前月期数据集合
     */
    dataKeyList: Array<string>;
    /**
     * 周集合
     */
    weekTitle: Array<string>;
    /**
     * 当前选中日期的回调
     */
    handleChange?: (date: IDate) => void;
    /**
     * 关闭面版
     */
    onClose?: () => void;
    /**
     * 是否打开面版
     */
    open?: boolean;
    /**
     * 日历的最小日期，格式为 YYYY-MM-DD
     * @default 当前日期
     */
    minDate?: IDate;
    /**
     * 日历的最大日期，格式为 YYYY-MM-DD
     * @default 当前日期的后6个月
     */
    maxDate?: IDate;
    /**
     * 日历上的一个状态的显示，
     * 自定义渲染日历单个节点函数
     * @default defaultRender
     */
    renderDay?: (day: IDayProps) => React.ReactNode;
}
export interface IQuickPanelProps {
    weekdays: string[];
    curDate: IDate;
    handleChange: (date: IDate) => void;
    onOpen: () => void;
}
export interface IDayProps {
    /**
     * 当前渲染日期
     */
    dateItem: IDate;
    /**
     * 当前渲染月份
     */
    month: string;
    /**
     * 当前选中日期
     */
    curDate: IDate;
    /**
     * 最小日期
     */
    minDate: IDate;
    /**
     * 最大日期
     */
    maxDate: IDate;
    /**
     * 点击事件
     */
    onClick: Function;
}
