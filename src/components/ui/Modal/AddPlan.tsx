import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';

const AddPlan: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log(modalText);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      // 버튼 누른 후 지도에 반영하도록 로딩 동작하는 방법
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalText(e.target.value);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        일정 추가
      </Button>
      <Modal title='일정 추가' open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <Input placeholder='추가할 일정' value={modalText} onChange={handleInputChange} />
      </Modal>
    </>
  );
};
export default AddPlan;
