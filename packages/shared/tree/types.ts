/*
 * @Author: Yue·jian
 * @Date: 2021-01-14 11:04:08
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-11 16:09:51
 * @Description: 文件用途描述
 */

export type IText = string | number;
export type ITexts = IText | Array<IText> | undefined;

export interface IOption {
    label: IText;
    value: IText;
    disabled?: boolean;
    data?: any;
    children?: IOption[];
}
