import * as dotenv from 'dotenv';
dotenv.config();

import { privateKeyToAccount } from 'viem/accounts';

export const mainSignerAccount = privateKeyToAccount(
  process.env.WALLET_ADMIN as `0x${string}`,
);

export const createAccountFromPrivateKey = (privateKey: `0x${string}`) => {
  return privateKeyToAccount(privateKey);
};
