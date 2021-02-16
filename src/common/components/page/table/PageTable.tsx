import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import React, {
  FC,
  useEffect,
  useRef,
  PropsWithChildren,
} from 'react';
import SelfStyle from './PageTable.less';
export interface IPageTableProps<T>
  extends Omit<TableProps<T>, 'columns'> {
  columns: {
    data: keyof T;
  }[];
}

function PageTable<T>(props: PropsWithChildren<IPageTableProps<T>>) {
  const { children } = props;

  return <Table></Table>;
}

// const PageTable: FC<IPageTableProps<T>> = (props) => {
//         const { children } = props;

//         return <Table></Table>;
//   };
export default PageTable;
