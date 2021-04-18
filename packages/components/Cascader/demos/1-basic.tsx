/*
 * @Author: Yue·jian
 * @Date: 2021-03-13 17:03:56
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-18 18:03:47
 * @Description: 文件用途描述
 */
import React from 'react';
import { Cascader } from '@comuse/components';
const options = [
  {
    label: '杭州市',
    value: 'hz',
    children: [
      {
        label: '莱茵·矩阵国际 一号楼',
        value: 'hz-1',
      },
      {
        label: '莱茵·矩阵国际 二号楼',
        value: 'hz-2',
      },
    ],
  },
  {
    label: '成都市',
    value: 'cd',
    children: [
      {
        label: '成都摩天大厦一',
        value: 'cd-1',
      },
      {
        label: '成都摩天大厦二',
        value: 'cd-2',
      },
    ],
  },
  {
    label: '上海市',
    value: 'sh',
    children: [
      {
        label: '东方明珠',
        value: 'sh-1',
      },
    ],
  },
  {
    label: '纽约市',
    value: 'ny',
    children: [
      {
        label: '纽约摩天大厦',
        value: 'ny-1',
        children: [
          {
            label: '大厦一座',
            value: 'ny-1-1',
          },
          {
            label: '大厦二座',
            value: 'ny-1-2',
          },
        ],
      },
      {
        label: '纽约大厦',
        value: 'ny-2',
      },
    ],
  },
];
export default function BasicDemo() {
  return (
    <Cascader
      className="app-addr"
      prefixNode={
        <i
          style={{
            margin: '11px 8px 11px 12px',
            fontSize: '16px',
            color: '#313438',
            verticalAlign: 'middle',
          }}
        />
      }
      options={options}
    />
  );
}

export const meta = {
  id: 'Cascader1',
  title: 'Cascader基本',
  desc: 'Cascader 基础使用方法',
};
