import { z } from 'zod';

export const CreateWalletSchema = z.object({
  publicKey: z.string(),
  privateKey: z.string(),
  owner_id: z.number(),
});

type CreateWalletSchema = z.infer<typeof CreateWalletSchema>;

export class CreateWalletDto implements CreateWalletSchema {
  publicKey: string;
  privateKey: string;
  owner_id: number;
}
