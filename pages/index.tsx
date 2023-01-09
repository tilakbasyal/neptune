import React, { createContext } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { injected } from "../utils/wallet/connectors";
import { useWeb3React } from "@web3-react/core";

// antd
import { theme } from "antd";
import ConverterForm from "../components/Form/Form";
import WalletModal from "../components/Modal/Modal";
import TitleWithImage from "../components/TitleWithImage/TitleWithImage";
import useBalance from "../hooks/useBalanceHook";
import { WalletContextType } from "./types/index.types";
const { useToken } = theme;

// const inter = Inter({ subsets: ['latin'] })

interface Error {
  name: string;
  message: string;
  stack?: string;
}

export const WalletDetailsContext = createContext<WalletContextType>({
  active: false,
  account: "",
  chainId: 0,
  balance: 1,
  error: {
    message: "",
    name: "",
  },
});

export default function Home() {
  const { token } = useToken();

  const { active, account, activate, deactivate, chainId, library, error } =
    useWeb3React();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const balance = useBalance({ library, account });

  const connect = async () => {
    try {
      setLoading(true);
      await activate(injected);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
      setLoading(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
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
            value={{ active, account, chainId, balance, error }}
          >
            <WalletModal
              open={isModalOpen}
              handlers={{
                open: showModal,
                confirm: handleOk,
                cancel: handleCancel,
              }}
              title="Wallet Details"
              confirmLoading={loading}
              okText={!active ? "Connect to wallet" : "Disconnect From Wallet"}
            />
          </WalletDetailsContext.Provider>
        </div>
      </main>
    </>
  );
}
