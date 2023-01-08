import React, { Dispatch, MutableRefObject, ReducerAction } from "react";
import { Button, Col, Row } from "antd";
import { TransactionOutlined } from "@ant-design/icons";

enum CurrencyType {
  BUSD = "busd",
  NEP = "nep",
}

type ActionType = {
  type: string;
  inputValue: number;
};

const handleInputChange =
  (type: string) =>
  (dispatch: Dispatch<ReducerAction<() => void>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type,
      inputValue: parseInt(value),
    });
  };

const reducer = (state: CurrencyType, action: ActionType) => {
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
        nep: Number(action.inputValue / 3).toFixed(2),
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
  const [state, dispatch] = React.useReducer(reducer, {
    nep: 1,
    busd: 3,
  });

  const inputElNep = React.useRef<HTMLInputElement>(null);

  // function setCaretPosition(element, length) {
  //   if (element.setSelectionRange) {
  //     element.focus();
  //     element.setSelectionRange(length, length);
  //   }
  // }

  React.useEffect(() => {
    if (inputElNep.current) {
      // setCaretPosition(inputElNep, inputElNep.current.value.length);
      inputElNep.current.focus();
    }
  }, []);

  return (
    <form action="" method="POST">
      <label htmlFor="nepali_currency">NEP</label>
      <input
        ref={inputElNep}
        type="number"
        name="nepali_currency"
        // @ts-ignore
        onChange={handleInputChange(CurrencyType.NEP)(dispatch)}
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
        onChange={handleInputChange(CurrencyType.BUSD)(dispatch)}
        value={state.busd}
        placeholder="BUSD Equivalent"
      />

      <Row justify="center">
        <Col span={24} style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handlers.open}>
            Check Wallet details
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default ConverterForm;
