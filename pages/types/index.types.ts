export type WalletContextType = {
  active: boolean;
  account: string | null | undefined;
  chainId: number | undefined;
  balance: number;
  error: Error | undefined;
};
