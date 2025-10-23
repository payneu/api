// 0x0d24A9bCC5b84E7782629174468C35d17d0a117e

import { erc20ABI } from 'src/utils/erc20/erc20-abi';
import { initClients } from './clients';
const TOKEN_BAZED = process.env.TOKEN_BAZED as `0x${string}`;

const { SETTLEMENT_CONTRACT } = process.env;

async function main() {
  const { publicClient, wallets } = initClients();
  const args = [
    SETTLEMENT_CONTRACT,
    999999999999999999999999999999999000000000000000000n,
  ];
  // approve the SETTLEMTN contract
  const { result, request } = await publicClient.simulateContract({
    address: TOKEN_BAZED,
    abi: erc20ABI,
    functionName: 'approve',
    args,
    account: wallets.deployer.account,
  });
  const hash = await wallets.liquidityProvider.writeContract(request);
  console.log('approved hash', hash);
}

main();
