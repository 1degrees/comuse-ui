/*
 * @Author: Yue·jian
 * @Date: 2021-01-14 11:04:08
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-05 19:35:25
 * @Description: 文件用途描述
 */
import React, { HTMLAttributes, RefObject } from 'react';

export type HTMLCascaderAttributes = Omit<
    HTMLAttributes<HTMLDivElement>,
    'value' | 'defaultValue' | 'onChange'
>;

export type IValues = IValue | Array<IValue> | undefined;

export type IValue = string | number;

export interface ICascaderProps extends HTMLCascaderAttributes {
    /*
     * 在输入框前增加节点
     */
    prefixNode: React.ReactNode;
    /*
     * 选择提示语
     */
    placeholder?: string;
    /*
     * 树状选项列表
     */
    options: IOption[];
    /*
     * 选中值
     */
    value?: IValues;
    /*
     * 默认值
     */
    defaultValue?: IValues;
    /*
     * 选中回调
     * @param e 选中节点的option
     * @param ref 选中节点的Ref，提供setChildren方法用于异步设置子选项
     */
    onChange?: (e: ICascaderValue, ref?: RefObject<any>) => void;
    /*
     * 打开面板回调
     */
    onOpen?: () => void;
    /*
     * 关闭回调
     */
    onClose?: () => void;
    /*
     * 开启多选 暂未完善
     */
    multiple?: boolean;
    /*
     * 容许清空 暂未完善
     */
    allowClear?: boolean;
}

export interface IOption {
    label: string;
    value: IValue;
    disabled?: boolean;
    children?: IOption[];
    data?: any;
}

export type ICascaderValue = IOption | IOption[] | undefined;

export interface ICascaderInputProps {
    /*
     * 在输入框前增加节点
     */
    prefixNode: React.ReactNode;
    /*
     * 打开选择器
     */
    onOpen: () => void;
    /*
     * 选项显示值
     */
    text: string;
    /*
     * 容许清除
     */
    allowClear: boolean;
    /*
     * 选中回调
     */
    handleChange?: (e: ICascaderValue, ref?: RefObject<any>) => void;
}

export interface ICascaderMenuProps {
    onClose: () => void;
    /*
     * 是否打开
     */
    open: boolean;
    /*
     * 提示文字
     */
    placeholder: string;
    /*
     * 选项
     */
    options: IOption[];
    /*
     * 被选中父选项
     */
    parents: IOption[];
    /*
     * 选中值
     */
    value: IValues;
    /*
     * 选中回调
     */
    handleChange?: (e: ICascaderValue, ref?: RefObject<any>) => void;
    /*
     * 开启多选
     */
    multiple: boolean;
}

export interface IMenuItemProps {
    panelRef: React.RefObject<HTMLDivElement>;

    index?: number;

    level?: number;

    isOpen: boolean;

    openHandle: (o: IOption) => void;

    option: IOption;

    value?: IValues;

    parents: IOption[];

    multiple?: boolean;

    handleChange?: (e: ICascaderValue, ref?: RefObject<any>) => void;
}

export interface IMenuProps {
    panelRef: React.RefObject<HTMLDivElement>;

    index?: number;

    level?: number;

    options: IOption[];

    parents: IOption[];

    value?: IValues;

    multiple?: boolean;

    handleChange?: (e: ICascaderValue, ref?: RefObject<any>) => void;
}
