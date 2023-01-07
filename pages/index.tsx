import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { injected } from '../utils/wallet/connectors';
import { useWeb3React } from '@web3-react/core';

// antd 
import { Button, Card, Modal, theme, Typography } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
const { useToken } = theme;



// const inter = Inter({ subsets: ['latin'] })

type currencyType = {
  nep: number | string;
  busd: number | string;
}

type ActionType = {
  type: string;
  inputValue: number;
}


const reducer = (state: currencyType, action:ActionType) => {
  console.log(action)
  switch (action.type) {
    case 'nep':
       return {
        nep: action.inputValue,
        busd: action.inputValue * 3,
      }
    case 'busd' :
      return {
        busd: action.inputValue,
        nep: (action.inputValue / 3)
      }
      default: 
      return state;
  }
}

type ActiveStatusChecker = {
  isActive: boolean;
  account: any;
  chainId: any;
}

export const WalletDetails:React.FC<ActiveStatusChecker> = ({isActive, account, chainId}) => {
  if (!isActive) return (
    <Typography.Text type='danger'>
      Wallet Not Connected. Please click on &apos;Connect to wallet&apos; to connect to your wallet. 
    </Typography.Text> );
  return (
    <Card title="Wallet Details">
      <p>Account: {account}</p>
      <p>ChainId: {chainId}</p>
    </Card>
  )
}


export default function Home() {

const { token } = useToken();
  const [state, dispatch] = React.useReducer(reducer, {nep: '', busd: ''});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleInputChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    dispatch({
      type,
      inputValue: parseInt(value)
    })
  }

  const {active, account, activate, deactivate, chainId} = useWeb3React();

  const connect = async() => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }

  const disconnect = async() => {
    try {
      deactivate();
    } catch (error) {
      console.error(error);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!active) {
      connect();
      return;
    }
    disconnect();
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Head>
        <title>Neptune Mutual Wallet</title>
        <meta name="description" content="Neptune Mutual Wallet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{backgroundColor: token.colorPrimary, fontFamily: token.fontFamily, height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
          <Image src='/neptune.svg' width={100} height={100} alt='Neptune Mutual' style={{width: '100%', margin: '0 auto'}} />

          <Typography.Title level={4} style={{color: 'white', textAlign: 'center'}}>Get the accurate exchange rates.</Typography.Title>

          <form action="" method='POST'>
            <label htmlFor="nepali_currency">NEP</label>
            <input type="number" name="nepali_currency" onChange={handleInputChange('nep')}  value={(state.nep)} placeholder='Nepal Currency ' />

            <div style={{textAlign: 'center', margin: '12px auto'}}>
              <TransactionOutlined style={{fontSize: 32}} />
            </div>

            <label htmlFor='busd_currency'>BUSD</label>
            <input type="number" name="busd_currency" onChange={handleInputChange('busd')} value={state.busd} placeholder='BUSD Equivalent' />

            <Button type='primary' onClick={showModal}>Check Wallet details</Button>

            <Modal 
              title="Wallet Details" 
              centered open={isModalOpen} 
              onOk={handleOk} 
              onCancel={handleCancel}
              okText= {!active ? 'Connect to wallet' : 'Disconnect From Wallet'}
            >
              <WalletDetails isActive={active} account={account} chainId={chainId} />
            </Modal>

          </form>
        </div>
      </main>
    </>
  )
}
