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
  confirmLoading: boolean;
};

const WalletDetailsModal: React.FC<WalletModalPropsType> = ({
  title,
  open,
  okText,
  handlers,
  confirmLoading,
}) => {
  const { confirm, cancel } = handlers;
  const { active } = React.useContext(WalletDetailsContext);
  return (
    <Modal
      centered
      open={open}
      title={title}
      onOk={confirm}
      onCancel={cancel}
      okText={okText}
      confirmLoading={confirmLoading}
      okButtonProps={{
        danger: active,
      }}
    >
      <WalletDetails />
    </Modal>
  );
};

export default WalletDetailsModal;
