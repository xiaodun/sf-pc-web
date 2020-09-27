import React, { useEffect, useState, useRef } from 'react';
import Note from './components/note/note';
import TNotes from './TNotes';
import SelfStyle from './LNotes.less';
import SNotes from './SNotes';
import TRes from '@/common/type/TRes';
import { PageFooter } from '@/common/components';
import { Button, Tabs } from 'antd';
import EditModal, {
  IEditModalRef,
} from './components/edit/EditModal';
import ZoomImgModal, {
  IZoomImgModalRef,
} from './components/zoom/ZoomImgModal';
export default () => {
  const [lists, setLists] = useState<TRes.Lists<TNotes>>(
    new TRes.Lists(),
  );
  const [addPos, setAddPos] = useState<number>(null);
  const editModalRef = useRef<IEditModalRef>();
  const zoomModalRef = useRef<IZoomImgModalRef>();
  console.log('wx', 12);
  useEffect(() => {
    reqGetList();
    setTimeout(() => {
      document.title = '日记本';
    });

    document.addEventListener('dragover', onDragOver);
    return () => {
      document.removeEventListener('dragover', onDragOver);
    };
  }, []);
  function onDragOver(event: DragEvent) {
    const dataTransfer = event.dataTransfer;
    event.preventDefault();
    if (event.dataTransfer) {
      dataTransfer.dropEffect = 'none';
    }
  }
  function showZoomModal(src: string) {
    zoomModalRef.current.showModal(src);
  }
  function onAddNoteSuccess(notes: TNotes) {
    const newLists = TRes.addItem(lists, (newDataList) => {
      newDataList.splice(addPos, 0, notes);
      return newDataList;
    });
    setLists(newLists);
  }
  function onEditNoteSuccess(notes: TNotes) {
    const newLists = TRes.updateItem(
      lists,
      notes,
      (data) => data.id === notes.id,
    );
    setLists(newLists);
  }
  function onEditNote(data?: TNotes, index = 0) {
    setAddPos(index);
    editModalRef.current.showModal(data);
  }
  async function reqGetList() {
    const res = await SNotes.getList();
    if (res.success) {
      setLists(TRes.asLists(res));
    }
  }

  return (
    <div>
      {lists.data.map((note, index) => (
        <div key={note.id} className={SelfStyle.noteWrapper}>
          <Note
            data={note}
            index={index}
            lists={lists}
            setLists={setLists}
            onEdit={onEditNote}
            showZoomModal={showZoomModal}
            onEditSuccess={onEditNoteSuccess}
          ></Note>
        </div>
      ))}
      <EditModal
        ref={editModalRef}
        onAddSuccess={onAddNoteSuccess}
        onEditSuccess={onEditNoteSuccess}
      ></EditModal>
      <PageFooter>
        <Button onClick={() => onEditNote()}>新建笔记</Button>
      </PageFooter>
      <ZoomImgModal ref={zoomModalRef}></ZoomImgModal>
    </div>
  );
};
