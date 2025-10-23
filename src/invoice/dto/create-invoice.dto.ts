import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  details: z.string(),
  merchant_id: z.number(),
  token_id: z.number(),
  amount: z.number(),
  status: z.string().optional(),
});

type CreateInvoiceSchema = z.infer<typeof CreateInvoiceSchema>;

export class CreateInvoiceDto implements CreateInvoiceSchema {
  @ApiProperty({ example: 'Payment for buying a digital product' })
  details: string;

  @ApiProperty({ example: 1 })
  merchant_id: number;

  @ApiProperty({ example: 1 })
  token_id: number;

  @ApiProperty({ example: 100 })
  amount: number;

  status: string;
}
