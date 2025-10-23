import { createPublicClient, http } from 'viem';

export const publicClient = (rpcUrl: string) =>
  createPublicClient({
    transport: http(rpcUrl),
  });
