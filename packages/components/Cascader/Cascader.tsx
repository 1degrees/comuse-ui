/*
 * @Author: Yue·jian
 * @Date: 2021-02-26 19:56:45
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-05 19:32:47
 * @Description: 文件用途描述
 */
import React from 'react';
import { pick } from 'lodash';
import { ICascaderProps } from './types';
import CascaderInput from './CascaderInput';
import CascaderPanel from './CascaderPanel';
import useCascader from './useCascader';
import { CascaderContainer } from './styles';

export function Cascader(props: ICascaderProps) {
    const others = pick(props, ['className', 'style']);
    const {
        open,
        text,
        rValue,
        options,
        parents,
        prefixNode,
        placeholder,
        handleChange,
        handleOpen,
        handleClose,
        allowClear,
        multiple
    } = useCascader(props);
    return (
        <CascaderContainer {...others}>
            <CascaderInput
                text={text}
                onOpen={handleOpen}
                prefixNode={prefixNode}
                allowClear={allowClear}
                handleChange={handleChange}
            />
            <CascaderPanel
                open={open}
                parents={parents}
                value={rValue}
                multiple={multiple}
                options={options}
                placeholder={placeholder}
                onClose={handleClose}
                handleChange={handleChange}
            />
        </CascaderContainer>
    );
}
