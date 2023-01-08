import { useState, useEffect, useCallback } from "react";

function useBalance({
  library,
  account,
}: {
  library: any;
  account: string | null | undefined;
}) {
  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    return await library.eth
      .getBalance(account)
      .then((balance: any) => {
        console.log(balance);
        setBalance(balance);
      })
      .catch(() => {
        setBalance(0);
      });
  }, [account, library]);

  useEffect(() => {
    if (library) {
      getBalance();
    }
  }, [getBalance, library]);

  return balance;
}

export default useBalance;
