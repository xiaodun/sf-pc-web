import React, { ReactNode } from 'react';
import SelfStyle from './note.less';
import { Card, Button, Menu, Dropdown, message, Space } from 'antd';
import {
  CopyOutlined,
  EditOutlined,
  CloseOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import SyntaxHighlighter from 'react-syntax-highlighter';
import TNotes from '../../TNotes';
import moment from 'moment';
import { YYYY_MM_DD } from '@/common/constant/DateConstant';
import UCopy from '@/common/utils/copy';
import SNotes from '../../SNotes';
import TRes from '@/common/type/TRes';
import { IMG_PROTOCOL_KEY } from '../..';

export interface INoteProps {
  onEdit: (data?: TNotes, index?: number) => void;
  data: TNotes;
  index: number;
  lists: TRes.Lists<TNotes>;
  setLists: React.Dispatch<React.SetStateAction<TRes.Lists<TNotes>>>;
  showZoomModal: (src: string) => void;
}
export interface INoteAction {
  content: ReactNode;
  copyStr?: string;
}
const Note = (props: INoteProps) => {
  const { data } = props;
  let title =
    data.title ||
    moment(data.createTime || undefined).format(YYYY_MM_DD);
  const menu = (
    <Menu>
      <Menu.Item key="noitce_top" onClick={() => reqTopItem(data)}>
        置顶
      </Menu.Item>
      <Menu.Item
        key="add_up"
        onClick={() => props.onEdit(null, props.index)}
      >
        向上添加
      </Menu.Item>
      <Menu.Item
        key="add_down"
        onClick={() => props.onEdit(null, props.index + 1)}
      >
        向下添加
      </Menu.Item>
    </Menu>
  );
  async function reqDelItem(id: string) {
    const res = await SNotes.delItem(id);
    if (res.success) {
      props.setLists(
        TRes.delItem(props.lists, (item) => item.id === id),
      );
    }
  }
  async function onCopy() {
    UCopy.copyStr(data.content);
  }
  async function reqTopItem(data: TNotes) {
    const res = await SNotes.topItem(data);
    if (res.success) {
      const newLists = TRes.changePos(props.lists, data, 0);
      props.setLists(newLists);
    }
  }
  function parseContent(content: string = '', base64imgs: Object) {
    let list = dealCode(content);
    list = dealLink(list, base64imgs);
    return withAble(list);
  }
  function dealCode(content: string) {
    //处理代码块
    let prefix = 'code',
      key = 0;

    const codePattern = /```([\s\S]*?)```/g;
    let list: INoteAction[] = [];

    let result: RegExpExecArray | null,
      lastIndex = 0;
    while ((result = codePattern.exec(content)) !== null) {
      if (result.index !== lastIndex) {
        list.push({
          content: content.substring(lastIndex, result.index),
        });
      }
      if (result[1]) {
        list.push({
          content: (
            <div
              key={prefix + key++}
              className={SelfStyle.codeWrapper}
            >
              <SyntaxHighlighter showLineNumbers>
                {result[1]}
              </SyntaxHighlighter>
            </div>
          ),
          copyStr: result[1],
        });
      }

      lastIndex = result.index + result[0].length;
    }
    if (lastIndex !== content.length)
      list.push({
        content: content.substring(lastIndex, content.length),
      });
    return list;
  }
  function dealLink(list: INoteAction[], base64imgs: Object) {
    //处理链接
    let prefix = 'link',
      key = 0;

    const imgStuffixList = ['.jpg', '.jpeg', '.gif', '.png', '.svg'];
    const linkPattern = RegExp(
      `(https?|ftp|file|${IMG_PROTOCOL_KEY})://[-A-Za-z0-9+&@#/%?=~_|!:,.;\u4e00-\u9fa5]+[-A-Za-z0-9+&@#/%=~_|\u4e00-\u9fa5]`,
      'g',
    );
    const newList: INoteAction[] = [];
    list.forEach((item) => {
      if (typeof item.content === 'string') {
        let strList = item.content.split(/\n/);

        strList.forEach((str) => {
          let result: RegExpExecArray | null,
            lastIndex = 0;

          if (str.match(linkPattern)) {
            while ((result = linkPattern.exec(str)) !== null) {
              if (result.index !== lastIndex) {
                const content = str.substring(
                  lastIndex,
                  result.index,
                );
                newList.push({
                  content,
                  copyStr: content,
                });
              }
              const link = result[0];
              const isImg = imgStuffixList.some(
                (stuffix) => link.lastIndexOf(stuffix) !== -1,
              );
              if (isImg) {
                //图片
                const isPaste = link.indexOf(IMG_PROTOCOL_KEY) === 0;
                let src: string;
                if (isPaste) {
                  //黏贴图片
                  src = base64imgs[link];
                } else {
                  src = link;
                }
                newList.push({
                  copyStr: src,
                  content: (
                    <div
                      className={SelfStyle.imgWrapper}
                      onClick={() => props.showZoomModal(src)}
                    >
                      <img key={prefix + key++} src={src} alt="" />
                    </div>
                  ),
                });
              } else {
                //普通链接
                newList.push({
                  copyStr: link,
                  content: (
                    <a
                      target="_blank"
                      key={prefix + key++}
                      href={link}
                    >
                      {link}
                    </a>
                  ),
                });
              }
              lastIndex = result.index + link.length;
            }
            if (lastIndex !== str.length) {
              const content = str.slice(lastIndex);
              newList.push({
                content,
                copyStr: content,
              });
            }
          } else {
            newList.push({
              copyStr: str,
              content: str,
            });
          }
        });
      } else {
        newList.push(item);
      }
    });
    return newList;
  }

  function withAble(list: INoteAction[]) {
    //对每一个特殊元素块或一行赋予一些能力
    let prefix = 'line',
      key = 0;
    const newList: ReactNode[] = [];

    list.forEach((item) => {
      newList.push(
        <div key={prefix + key++} className={SelfStyle.lineWrapper}>
          <div className="actions">
            <Space size="large">
              <a
                type="link"
                onClick={() => UCopy.copyStr(item.copyStr)}
              >
                复制
              </a>
              <a type="link">删除</a>
            </Space>
          </div>
          <div className="contents">
            {item.content || <span>&nbsp;</span>}
          </div>
        </div>,
      );
    });
    return newList;
  }

  return (
    <Card
      size="small"
      title={title}
      className={SelfStyle.noteWrapper}
      extra={
        <Button
          icon={
            <CloseOutlined
              onClick={() => reqDelItem(data.id)}
            ></CloseOutlined>
          }
        ></Button>
      }
      actions={[
        <CopyOutlined onClick={onCopy} />,
        <EditOutlined
          key="edit"
          onClick={() => props.onEdit(data)}
        />,
        <Dropdown overlay={menu} placement="topCenter">
          <Button>
            <EllipsisOutlined key="ellipsis" />
          </Button>
        </Dropdown>,
      ]}
    >
      {parseContent(data.content, data.base64)}
    </Card>
  );
};

export default Note;
