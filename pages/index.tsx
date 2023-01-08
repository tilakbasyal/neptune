import React, { createContext } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { injected } from "../utils/wallet/connectors";
import { useWeb3React } from "@web3-react/core";

// antd
import { theme } from "antd";
import ConverterForm from "../components/Form";
import WalletModal from "../components/Modal";
import TitleWithImage from "../components/TitleWithImage";
import useBalance from "../hooks/useBalanceHook";
const { useToken } = theme;

// const inter = Inter({ subsets: ['latin'] })
export type WalletContextType = {
  active: boolean;
  account: string | null | undefined;
  chainId: number | undefined;
  balance: number;
};

export const WalletDetailsContext = createContext<WalletContextType>({
  active: false,
  account: "",
  chainId: 0,
  balance: 1,
});

export default function Home() {
  const { token } = useToken();

  const { active, account, activate, deactivate, chainId, library } =
    useWeb3React();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  console.log({ library, account });

  const balance = useBalance({ library, account });

  const connect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    if (!active) {
      connect();
      return;
    }
    disconnect();
    // setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Neptune Mutual Wallet</title>
        <meta name="description" content="Neptune Mutual Wallet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          backgroundColor: token.colorPrimary,
          fontFamily: token.fontFamily,
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <TitleWithImage
            title="Get the accurate exchange rates."
            imageLink="/neptune.svg"
          />

          <ConverterForm
            handlers={{
              open: showModal,
            }}
          />

          <WalletDetailsContext.Provider
            value={{ active, account, chainId, balance }}
          >
            <WalletModal
              open={isModalOpen}
              title="Wallet Details"
              okText={!active ? "Connect to wallet" : "Disconnect From Wallet"}
              handlers={{
                open: showModal,
                confirm: handleOk,
                cancel: handleCancel,
              }}
            />
          </WalletDetailsContext.Provider>
        </div>
      </main>
    </>
  );
}
