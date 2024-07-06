import React, { useState } from "react";
import { Input, Modal } from "antd";
import usePlanStore from "@store/usePlanStore";

interface AddPlanProps {
  confirmLoading: boolean;
  modalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const AddPlan: React.FC<AddPlanProps> = ({ confirmLoading, modalOpen, handleOk, handleCancel }) => {
  const [addPlace, setAddPlace] = useState<string>("");
  const { plans } = usePlanStore();
  const bound = plans[0].city;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPlace(e.target.value);
  };
  return (
    <Modal
      title="일정 추가"
      confirmLoading={confirmLoading}
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Input placeholder="추가할 일정" value={addPlace} onChange={handleInputChange} />
    </Modal>
  );
};

export default AddPlan;
