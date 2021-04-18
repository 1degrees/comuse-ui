import React, { useRef, useState, useImperativeHandle, useMemo, useEffect } from 'react';
import { Portal } from '@qunhe/muya-ui';
import { CloseIcon } from '@qunhe/muya-theme-light';
import {
    PanelContainer,
    PanelContent,
    PanelBg,
    PanelHeader,
    PanelMenu,
    MenuContainer,
    ItemContainer,
    ItemWarpper,
    ItemLabel
} from './styles';
import { ICascaderMenuProps, IMenuItemProps, IMenuProps, IOption } from './types';

export function MenuItem(props: IMenuItemProps) {
    const {
        multiple,
        value,
        parents,
        option,
        level,
        index,
        isOpen,
        panelRef,
        handleChange,
        openHandle
    } = props;
    const ref = useRef<any>(null);
    const [children, setChildren] = useState<IOption[] | undefined>(option.children);
    const isActive = useMemo(() => {
        if (children && children.length) {
            return isOpen;
        } else if (Array.isArray(value)) {
            return value.includes(option.value);
        } else {
            return option.value === value;
        }
    }, [isOpen, value, option, children]);
    useImperativeHandle(ref, () => {
        return {
            setChildren: (childs: IOption[]) => {
                setChildren(childs);
                option.children = childs;
            }
        };
    });
    return (
        <ItemContainer>
            <ItemWarpper
                level={level}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                    openHandle(option);
                    if (!children || !children.length) {
                        handleChange?.(option, ref);
                    }
                }}
            >
                <ItemLabel>{option.label}</ItemLabel>
            </ItemWarpper>
            {isOpen && children && children.length ? (
                <Menu
                    panelRef={panelRef}
                    index={index}
                    parents={parents}
                    options={children}
                    level={level}
                    value={value}
                    multiple={multiple}
                    handleChange={handleChange}
                />
            ) : null}
        </ItemContainer>
    );
}

export function Menu(props: IMenuProps) {
    const { value, handleChange, multiple, options, parents, level = 0, panelRef } = props;
    const [curOpen, setCurOpen] = useState<IOption>(parents[level]);
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        // 解决子组件渲染时 父组件未挂载问题
        panelRef.current && setShow(true);
    }, [panelRef.current]);
    return show ? (
        <Portal container={panelRef.current}>
            <MenuContainer level={level} className={`menu-items menu-items-${level}`}>
                {options.map((e: IOption, i: number) => {
                    const isOpen = curOpen
                        ? curOpen?.value === e.value && curOpen?.label === e.label
                        : i === 0;
                    return (
                        <MenuItem
                            multiple={multiple}
                            value={value}
                            panelRef={panelRef}
                            parents={parents}
                            handleChange={handleChange}
                            openHandle={(o: IOption) => setCurOpen(o)}
                            isOpen={isOpen}
                            index={i}
                            key={i}
                            option={e}
                            level={level + 1}
                        />
                    );
                })}
            </MenuContainer>
        </Portal>
    ) : null;
}

export default function CascaderPanel(props: ICascaderMenuProps) {
    const { open, onClose, options, parents, placeholder, value, handleChange, multiple } = props;
    const panelRef = useRef<HTMLDivElement>(null);
    return open ? (
        <PanelContainer>
            <PanelBg onClick={onClose} />
            <PanelContent className="cascader-panel open">
                <PanelHeader>
                    <span>{placeholder}</span>
                    <CloseIcon onClick={onClose} />
                </PanelHeader>
                <PanelMenu ref={panelRef}>
                    <Menu
                        value={value}
                        parents={parents}
                        multiple={multiple}
                        handleChange={handleChange}
                        panelRef={panelRef}
                        options={options}
                    />
                </PanelMenu>
            </PanelContent>
        </PanelContainer>
    ) : null;
}
