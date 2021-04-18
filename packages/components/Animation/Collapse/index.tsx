/*
 * @Author: Yue·jian
 * @Date: 2020-07-07 15:54:25
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-01-06 15:34:43
 * @Description: 伸缩动画
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

function Collapse(props: any) {
    const { children, isFold, heightFill } = props;
    const animatRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [css, setCss] = useState({});
    /* 动画结束事件 */
    const transitEnd = _.debounce(() => {
        /* 解决评论框显示不全BUG，超出包裹区 */
        if (!isFold) {
            setCss({
                height: isFold ? 0 : `${height}px`,
                overflow: 'unset'
            });
        }
    }, 50);
    /* 包裹区域高度计算 */
    const compulateHeight = useCallback(() => {
        const node: HTMLDivElement = animatRef.current as HTMLDivElement;
        const len: number = node.children.length;
        const oneNode: HTMLDivElement = node.children[0] as HTMLDivElement;
        const lastNode: HTMLDivElement = node.children[len - 1] as HTMLDivElement;
        const startT = oneNode.offsetTop;
        const endT = lastNode.offsetTop;
        const endH = lastNode.offsetHeight;
        const h = endT + endH - startT + heightFill;
        if (h !== height) {
            setHeight(h);
        }
    }, [height]);
    /* 包裹区域高度改变监听 */
    useEffect(() => {
        compulateHeight();
        /* 利用MutationObserver，检测元素节点结构属性变化导致的高度变化; */
        const handleResize = _.debounce(compulateHeight, 100, {
            leading: true,
            trailing: false
        });
        const observer = new MutationObserver(handleResize);
        observer.observe((animatRef.current as unknown) as Node, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
        });
        return () => {
            observer.disconnect();
        };
    }, []);
    /* 设置动画样式-包裹区域高度 */
    useEffect(() => {
        setCss({
            height: isFold ? 0 : `${height}px`,
            overflow: 'hidden'
        });
    }, [isFold, height]);
    return (
        <div ref={animatRef} className="animate-fold" style={css} onTransitionEnd={transitEnd}>
            {children}
        </div>
    );
}

Collapse.propTypes = {
    isFold: PropTypes.bool,
    children: PropTypes.node,
    heightFill: PropTypes.number
};

Collapse.defaultProps = {
    heightFill: 40
};

export default Collapse;
export { Collapse };
