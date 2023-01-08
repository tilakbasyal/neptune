import React, { useState, useEffect, useCallback } from "react";

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
        // if (!stale) {
        console.log(balance);
        setBalance(balance);
        // }
      })
      .catch(() => {
        // if (!stale) {
        setBalance(0);
        // }
      });
  }, [account, library]);

  useEffect(() => {
    if (library) {
      getBalance();
    }

    return () => {};
  }, [getBalance, library]);
  return balance;
}

export default useBalance;
