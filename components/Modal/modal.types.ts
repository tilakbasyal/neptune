export type WalletModalPropsType = {
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
