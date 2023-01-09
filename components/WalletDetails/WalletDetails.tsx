import React from "react";
import { Table, Typography } from "antd";
import { WalletDetailsContext } from "../../pages";
import { columns, dataNormalizer } from "./walletDetails.helpet";

const WalletDetails: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { active, account, chainId, balance, error } =
    React.useContext(WalletDetailsContext);

  if (error?.name && error.message && !loading) {
    return (
      <>
        <Typography.Text type="danger">{error.message}</Typography.Text>
      </>
    );
  }

  if (loading) {
    return (
      <Typography.Text>
        Please hold on while we connect to your wallet.
      </Typography.Text>
    );
  }

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
