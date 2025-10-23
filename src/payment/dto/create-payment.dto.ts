import { z } from 'zod';

export const CreatePaymentSchema = z.object({
  txHash: z.string(),
  merchant_id: z.number(),
});

type CreatePaymentSchema = z.infer<typeof CreatePaymentSchema>;

export class CreatePaymentDto implements CreatePaymentSchema {
  txHash: string;
  merchant_id: number;
}
