import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { ConfigProvider } from "antd";

function getLibrary(provider: any) {
  return new Web3(provider);
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1d2939",
            fontFamily: "Open Sans",
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </Web3ReactProvider>
  );
}
