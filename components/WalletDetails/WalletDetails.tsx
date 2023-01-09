import React from "react";
import { Table, Typography } from "antd";
import { WalletDetailsContext } from "../../pages";
import { columns, dataNormalizer } from "./walletDetails.helpet";

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
      // @ts-ignore
      columns={columns}
      dataSource={dataNormalizer({ account, chainId, balance })}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default WalletDetails;
