import React, { Reducer } from "react";
import { Button, Col, Row } from "antd";
import { TransactionOutlined } from "@ant-design/icons";

import InputError from "../InputError";
import { CurrencyType, handlersType } from "./form.types";
import { handleInputChange, reducer } from "./form.helper";

const ConverterForm: React.FC<handlersType> = ({ handlers }) => {
  const inputElNep = React.useRef<HTMLInputElement>(null);

  const [state, dispatch] = React.useReducer<Reducer<any, any>>(reducer, {
    nep: 1,
    busd: 3,
  });

  React.useEffect(() => {
    if (inputElNep.current) {
      inputElNep.current.focus();
    }
  }, []);

  return (
    <form>
      <label htmlFor="nepali_currency">NEP</label>
      <input
        autoFocus
        type="number"
        ref={inputElNep}
        value={state.nep}
        name="nepali_currency"
        placeholder="Nepal Currency "
        onChange={handleInputChange(CurrencyType.NEP)(dispatch)}
      />
      {state.error === "nepError" && <InputError />}

      <div style={{ textAlign: "center", margin: "12px auto" }}>
        <TransactionOutlined style={{ fontSize: 32 }} />
      </div>

      <label htmlFor="busd_currency">BUSD</label>
      <input
        type="number"
        value={state.busd}
        name="busd_currency"
        placeholder="BUSD Equivalent"
        onChange={handleInputChange(CurrencyType.BUSD)(dispatch)}
      />
      {state.error === "busdError" && <InputError />}

      <Row justify="center">
        <Col span={24} style={{ textAlign: "center", marginTop: 12 }}>
          <Button type="primary" onClick={handlers.open}>
            Check Wallet details
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default ConverterForm;
