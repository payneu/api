import * as dotenv from 'dotenv';
dotenv.config();

import { createWalletClient, http, WalletClient } from 'viem';
import { mainSignerAccount, createAccountFromPrivateKey } from './account';

export const mainSignerWalletClient = (rpcUrl: string): WalletClient => {
  return createWalletClient({
    transport: http(rpcUrl),
    account: mainSignerAccount,
  });
};

export const walletClient = (rpcUrl: string, privateKey: `0x${string}`) => {
  return createWalletClient({
    transport: http(rpcUrl),
    account: createAccountFromPrivateKey(privateKey),
  });
};
