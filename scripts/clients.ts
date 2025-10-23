import 'dotenv/config';
import {
  createPublicClient,
  createWalletClient,
  http,
  getContract,
} from 'viem';
import { privateKeyToAccount, nonceManager } from 'viem/accounts';

const { WALLET_PAYER, WALLET_BAZED_LP } = process.env;

const rpcUrl = process.env.RPC_URL as string;
const generateWalletClientForPk = (privateKey: `0x${string}`) => {
  const account = privateKeyToAccount(privateKey, { nonceManager });

  const walletCLient = createWalletClient({
    transport: http(rpcUrl),
    account,
  });

  return walletCLient;
};

export const initClients = () => {
  const rpcUrl = process.env.RPC_URL as string;
  const deployerPK = process.env.WALLET_ADMIN as `0x${string}`;

  const publicClient = createPublicClient({
    transport: http(rpcUrl),
  });

  return {
    publicClient,
    wallets: {
      deployer: generateWalletClientForPk(deployerPK),
      user1: generateWalletClientForPk(WALLET_PAYER as `0x${string}`),
      liquidityProvider: generateWalletClientForPk(
        WALLET_BAZED_LP as `0x${string}`,
      ),
    },
  };
};
