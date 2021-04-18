/*
 * @Author: Yue·jian
 * @Date: 2021-02-26 19:56:45
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-02 20:43:49
 * @Description: 文件用途描述
 */
import React from 'react';
import { InputWrapper } from './styles';
import { ICascaderInputProps } from './types';
import { BreadcrumbsIcon } from '@qunhe/muya-theme-light';
export default function CascaderInput(props: ICascaderInputProps) {
    const { text, onOpen, prefixNode } = props;
    return (
        <InputWrapper onClick={onOpen}>
            {prefixNode}
            <span>{text}</span>
            <BreadcrumbsIcon className="suffix" />
        </InputWrapper>
    );
}
