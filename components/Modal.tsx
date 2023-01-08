import { Modal } from "antd";
import React from "react";
import { WalletDetailsContext } from "../pages";
import WalletDetails from "./WalletDetails";

type WalletModalPropsType = {
  title: string;
  open: boolean;
  okText: string;
  handlers: {
    open: () => void;
    confirm: () => void;
    cancel: () => void;
  };
};

const WalletDetailsModal: React.FC<WalletModalPropsType> = ({
  title,
  open,
  okText,
  handlers,
}) => {
  const { confirm, cancel } = handlers;
  return (
    <Modal
      centered
      open={open}
      title={title}
      onOk={confirm}
      onCancel={cancel}
      okText={okText}
      // confirmLoading={true}
    >
      <WalletDetails />
    </Modal>
  );
};

export default WalletDetailsModal;
