// 0x0d24A9bCC5b84E7782629174468C35d17d0a117e

import { erc20ABI } from 'src/utils/erc20/erc20-abi';
import { initClients } from './clients';
import { PublicClient, WalletClient } from 'viem';
import { callMintTokens } from './01-mint-token';
const TOKEN_MUSD = process.env.TOKEN_MUSD as `0x${string}`;

const { SETTLEMENT_CONTRACT } = process.env;

async function main() {
  const { publicClient, wallets } = initClients();
  const args = [
    SETTLEMENT_CONTRACT,
    999999999999999999999999999999999000000000000000000n,
  ];
  // approve the SETTLEMTN contract
  const { result, request } = await publicClient.simulateContract({
    address: TOKEN_MUSD,
    abi: erc20ABI,
    functionName: 'approve',
    args,
    account: wallets.liquidityProvider.account,
  });
  const hash = await wallets.liquidityProvider.writeContract(request);
  console.log('approved hash', hash);

  const amountToMint = '10000';

  await callMintTokens(
    publicClient,
    TOKEN_MUSD,
    erc20ABI,
    wallets.deployer,
    wallets.liquidityProvider.account.address,
    amountToMint,
  );
}

main();
