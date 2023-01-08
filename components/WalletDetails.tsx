import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { WalletContextType, WalletDetailsContext } from "../pages";

interface DataType {
  key: number;
  name: string;
  value: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

function dataNormalizer({
  account,
  chainId,
  balance,
}: Partial<WalletContextType>) {
  return [
    {
      key: 1,
      name: "account",
      value: account,
    },
    {
      key: 2,
      name: "ChainId",
      value: chainId,
    },
    {
      key: 3,
      name: "Balance",
      value: balance,
    },
  ];
}

const WalletDetails: React.FC = () => {
  const { active, account, chainId, balance } =
    React.useContext(WalletDetailsContext);

  if (!active)
    return (
      <Typography.Text type="danger">
        Wallet Not Connected. Please click on &apos;Connect to wallet&apos; to
        connect to your wallet.
      </Typography.Text>
    );
  return (
    <Table
      //@ts-ignore
      columns={columns}
      dataSource={dataNormalizer({ account, chainId, balance })}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default WalletDetails;
