import 'dotenv/config';

import { Abi, parseEther, PublicClient, WalletClient } from 'viem';
import { initClients } from './clients';
import { erc20ABI } from 'src/utils/erc20/erc20-abi';

const TOKEN_BAZED = process.env.TOKEN_BAZED as `0x${string}`;
const TOKEN_MUSD = process.env.TOKEN_MUSD as `0x${string}`;

export const callMintTokens = async (
  client: PublicClient,
  tokenAddress: `0x${string}`,
  tokenContractAbi: readonly unknown[],
  signer: WalletClient,
  to: `0x${string}`,
  amount: string,
) => {
  const args = [to, parseEther(amount)];

  const { result, request } = await client.simulateContract({
    address: tokenAddress,
    abi: tokenContractAbi,
    functionName: 'mint',
    args,
    account: signer.account,
  });
  // console.log('simulate', { result })
  const hash = await signer.writeContract(request);
  console.log(hash);
  return hash;
};

async function main() {
  const { publicClient, wallets } = initClients();
  const amountToMint = '10000';
  await callMintTokens(
    publicClient,
    TOKEN_BAZED,
    erc20ABI,
    wallets.deployer,
    wallets.user1.account.address,
    amountToMint,
  );

  // await callMintTokens(
  //   publicClient,
  //   TOKEN_MUSD,
  //   erc20ABI,
  //   wallets.deployer,
  //   wallets.user1.account.address,
  //   amountToMint,
  // );
}

main();
