/*
 * @Author: Yue·jian
 * @Date: 2021-02-26 19:56:45
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-03-05 19:30:21
 * @Description: 文件用途描述
 */
import { findOptionByValue, findParents } from './utils';
import { ICascaderProps, IValues, IOption } from './types';
import { useCallback, useEffect, useMemo, useState, RefObject } from 'react';

export default function useCascader(props: ICascaderProps) {
    const {
        placeholder = '请选择其中一项',
        prefixNode,
        defaultValue,
        value,
        onChange,
        onOpen,
        onClose,
        options,
        multiple = false,
        allowClear = false
    } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [val, setVal] = useState<IValues>(defaultValue);
    const [selOptions, setSelOptions] = useState<IOption[]>([]);
    const rValue = useMemo(() => (value ? value : val), [val, value]);
    const parents = useMemo(() => {
        let rs: IOption[] = [];
        if (open) {
            const option = findOptionByValue(options, rValue);
            if (option?.length) {
                rs = findParents(options, option[0]);
            }
        }
        return rs;
    }, [open, rValue, options]);
    const text = useMemo(() => {
        if (selOptions && selOptions.length) {
            return selOptions.map((e: IOption) => e.label).join('、');
        } else {
            return placeholder;
        }
    }, [selOptions, placeholder, multiple]);
    const handleOpen = useCallback(() => {
        onOpen?.();
        setOpen(true);
    }, [onOpen]);
    const handleClose = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose]);
    const handleChange = useCallback(
        (v: IOption, ref: RefObject<any>) => {
            if (v) {
                if (multiple) {
                    onChange?.([...selOptions, v], ref);
                    if (!value) {
                        setVal(v.value);
                    }
                } else {
                    onChange?.(v, ref);
                    if (!value) {
                        setVal(v.value);
                    }
                }
                handleClose();
            }
        },
        [value, rValue, multiple, selOptions, onChange, handleClose]
    );
    useEffect(() => {
        if (rValue && options) {
            const ops = findOptionByValue(options, rValue);
            setSelOptions(ops);
        } else {
            setSelOptions([]);
        }
    }, [options, rValue]);
    return {
        open,
        rValue,
        text,
        prefixNode,
        placeholder,
        options,
        allowClear,
        multiple,
        parents,
        handleChange,
        handleOpen,
        handleClose
    };
}
