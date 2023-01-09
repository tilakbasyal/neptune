import { Typography } from "antd";
import React from "react";

const InputError: React.FC = () => {
  return (
    <Typography.Text type="danger" style={{ display: "flex" }}>
      Please input positive number only
    </Typography.Text>
  );
};

export default InputError;
