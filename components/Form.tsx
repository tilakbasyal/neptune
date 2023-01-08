import React, { Dispatch, ReducerAction } from "react";
import { Button } from "antd";
import { TransactionOutlined } from "@ant-design/icons";

type currencyType = {
  nep: number | string;
  busd: number | string;
};

type ActionType = {
  type: string;
  inputValue: number;
};

const handleInputChange =
  (type: string) =>
  // (dispatch: () => React.Dispatch<{ type: string; inputValue: any }>) =>
  (dispatch: Dispatch<ReducerAction<() => void>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type,
      inputValue: parseInt(value),
    });
  };

const reducer = (state: currencyType, action: ActionType) => {
  console.log(action);
  switch (action.type) {
    case "nep":
      return {
        nep: action.inputValue,
        busd: action.inputValue * 3,
      };
    case "busd":
      return {
        busd: action.inputValue,
        nep: action.inputValue / 3,
      };
    default:
      return state;
  }
};

// @TODO: can i make this a record type?
type handlersType = {
  handlers: {
    open: () => void;
  };
};

const ConverterForm: React.FC<handlersType> = ({ handlers }) => {
  const [state, dispatch] = React.useReducer(reducer, { nep: "", busd: "" });

  return (
    <form action="" method="POST">
      <label htmlFor="nepali_currency">NEP</label>
      <input
        type="number"
        name="nepali_currency"
        // @ts-ignore
        onChange={handleInputChange("nep")(dispatch)}
        value={state.nep}
        placeholder="Nepal Currency "
      />

      <div style={{ textAlign: "center", margin: "12px auto" }}>
        <TransactionOutlined style={{ fontSize: 32 }} />
      </div>

      <label htmlFor="busd_currency">BUSD</label>
      <input
        type="number"
        name="busd_currency"
        // @ts-ignore
        onChange={handleInputChange("busd")(dispatch)}
        value={state.busd}
        placeholder="BUSD Equivalent"
      />

      <Button type="primary" onClick={handlers.open}>
        Check Wallet details
      </Button>
    </form>
  );
};

export default ConverterForm;
