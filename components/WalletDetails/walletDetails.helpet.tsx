import { Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { WalletContextType } from "../../pages";
import { DataType, TableKeyType } from "./walletDetails.types";

export const columns: ColumnsType<DataType> = [
  {
    title: "Property",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <Typography.Paragraph strong style={{ marginBottom: 0 }}>
        {text}
      </Typography.Paragraph>
    ),
    width: 100,
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    render: (text, record) => {
      return (
        <Typography.Paragraph
          style={{ marginBottom: 0 }}
          copyable={record.name === "Account" ? true : false}
        >
          {text}
        </Typography.Paragraph>
      );
    },
    width: 200,
  },
];

export function dataNormalizer({
  account,
  chainId,
  balance,
}: Partial<WalletContextType>) {
  return [
    {
      key: 1,
      name: TableKeyType.ACCOUNT,
      value: account,
    },
    {
      key: 2,
      name: TableKeyType.CHAINID,
      value: chainId,
    },
    {
      key: 3,
      name: TableKeyType.BALANCE,
      value: balance,
    },
  ];
}
