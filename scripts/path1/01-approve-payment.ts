import { initClients } from 'scripts/clients';
import { erc20ABI } from 'src/utils/erc20/erc20-abi';
import { PublicClient, WalletClient } from 'viem';

const SPENDER_ADDRESS = process.env.PAYMENT_CONTRACT as `0x${string}`;
const TOKEN_BAZED = process.env.TOKEN_BAZED as `0x${string}`;
const TOKEN_MUSD = process.env.TOKEN_MUSD as `0x${string}`;

const callApprove = async (
  client: PublicClient,
  tokenAddress: `0x${string}`,
  signer: WalletClient,
) => {
  const args = [
    SPENDER_ADDRESS,
    999999999999999999999999999999999000000000000000000n,
  ];

  console.log('approval for', {
    user: signer.account?.address,
    token: tokenAddress,
  });
  const { result, request } = await client.simulateContract({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args,
    account: signer.account,
  });
  // console.log('simulate', { result })
  const hash = await signer.writeContract(request);
  console.log(hash);
  return hash;
};

async function main() {
  const clients = initClients();

  await callApprove(clients.publicClient, TOKEN_BAZED, clients.wallets.deployer);
  await callApprove(clients.publicClient, TOKEN_MUSD, clients.wallets.deployer);
}

main();
