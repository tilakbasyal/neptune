import { Modal } from "antd";
import React from "react";
import { WalletDetailsContext } from "../../pages";
import WalletDetails from "../WalletDetails/WalletDetails";
import { WalletModalPropsType } from "./modal.types";

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
      okText={okText}
      okButtonProps={{
        danger: active,
      }}
      onCancel={cancel}
      confirmLoading={confirmLoading}
    >
      <WalletDetails loading={confirmLoading} />
    </Modal>
  );
};

export default WalletDetailsModal;
