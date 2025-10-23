import { publicClient } from '../rpc-client/public-client';
import { erc20ABI } from './erc20-abi';

export const readErc20Balance = async (
  tokenAddress: `0x${string}`,
  owner: `0x${string}`,
): Promise<bigint> => {
  try {
    const client = publicClient('https://sepolia.base.org');
    const data = await client.readContract({
      address: tokenAddress,
      abi: erc20ABI,
      functionName: 'balanceOf',
      args: [owner],
    });
    return data as bigint;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
