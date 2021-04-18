import dayjs from 'dayjs';
import React, { useState } from 'react';
import { CloseIcon } from '@qunhe/muya-theme-light';
import { IDayProps, IPanelProps } from './types';
import {
    PanelContainer,
    Week,
    HeadTool,
    Panel,
    PannelHead,
    WeekendText,
    WeekText,
    Table,
    Month,
    MonthTitle,
    DayDetail,
    Normal,
    Light,
    Active,
    Today
} from './style';

export default function CalendarPanel(props: IPanelProps) {
    const {
        handleChange,
        onClose,
        open = false,
        weekTitle,
        dataList,
        dataKeyList,
        minDate,
        maxDate,
        curDate,
        renderDay = defaultRender
    } = props;
    const [init, setInit] = useState<number>(0);
    return (
        <PanelContainer className={`${!open && !init ? 'hide' : open ? 'open' : 'close'}`}>
            <PannelHead>
                <HeadTool>
                    <span>请选择日期</span>
                    <CloseIcon
                        onClick={() => {
                            setInit(init + 1);
                            onClose?.();
                        }}
                    />
                </HeadTool>
                <Week>
                    {weekTitle.map((e: string, i: number) => {
                        const Item = i > 4 ? WeekendText : WeekText;
                        return <Item key={i}>{e}</Item>;
                    })}
                </Week>
            </PannelHead>
            <Panel>
                {dataList.map((e: string[][], i: number) => {
                    return (
                        <Table key={i}>
                            <MonthTitle>{dayjs(dataKeyList[i]).format('YYYY年MM月')}</MonthTitle>
                            <Month>
                                {e.map((ee: string[], ii: number) => {
                                    let month = dayjs(dataKeyList[i]).format('YYYY-MM');
                                    return dayjs(ee[0]).format('YYYY-MM') === month ? (
                                        <Week key={ii}>
                                            {ee.map((d: string, index: number) => {
                                                return (
                                                    <DayDetail key={index}>
                                                        {renderDay({
                                                            dateItem: d,
                                                            onClick: () => {
                                                                handleChange?.(d);
                                                                onClose?.();
                                                            },
                                                            month,
                                                            curDate,
                                                            minDate: minDate!,
                                                            maxDate: maxDate!
                                                        })}
                                                    </DayDetail>
                                                );
                                            })}
                                        </Week>
                                    ) : null;
                                })}
                            </Month>
                        </Table>
                    );
                })}
            </Panel>
        </PanelContainer>
    );
}

export function defaultRender({ month, dateItem, curDate, minDate, maxDate, onClick }: IDayProps) {
    let Item: any = Normal;
    if (dayjs(dateItem).format('YYYY-MM') !== month) {
        // 非本月的
        return null;
    } else if (
        dayjs(dateItem).isBefore(dayjs(minDate)) ||
        dayjs(dateItem).isAfter(dayjs(maxDate))
    ) {
        // 超过范围的
        Item = Light;
    } else if (dateItem === curDate) {
        // 当前选中的
        Item = Active;
    } else if (dateItem === dayjs().format('YYYY-MM-DD')) {
        // 另外判断一个今天的
        Item = Today;
    }
    return (
        <Item
            onClick={() => {
                if (
                    dayjs(minDate)
                        .add(-1)
                        .isAfter(dateItem) ||
                    dayjs(maxDate)
                        .add(1)
                        .isBefore(dateItem)
                ) {
                    return;
                }
                onClick?.();
            }}
        >
            {dayjs(dateItem).isSame(dayjs(), 'day') ? '今' : dayjs(dateItem).date()}
        </Item>
    );
}
