/*
 * @Author: Yue·jian
 * @Date: 2021-03-13 17:03:56
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-14 14:11:06
 * @Description: 文件用途描述
 */
import React from 'react';
import { Animation } from '@comuse/components';
export default function BasicDemo() {
  return (
    <Animation.Collapse>
      <p>哈哈哈哈哈哈</p>
      <p>哈哈哈哈哈哈</p>
      <p>哈哈哈哈哈哈</p>
      <p>哈哈哈哈哈哈</p>
    </Animation.Collapse>
  );
}

export const meta = {
  id: 'Animation1',
  title: '动画-伸缩',
  desc: 'Collapse 基础使用方法',
};
