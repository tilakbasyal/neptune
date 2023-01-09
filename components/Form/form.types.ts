export type handlersType = {
  handlers: {
    open: () => void;
  };
};

export enum CurrencyType {
  BUSD = "busd",
  NEP = "nep",
}

export type ActionType = {
  type: string;
  inputValue: number;
};
