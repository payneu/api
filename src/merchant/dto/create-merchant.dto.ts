import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

// CreateOrder
export const CreateMerchantSchema = z.object({
  name: z.string(),
});

type CreateMerchantSchema = z.infer<typeof CreateMerchantSchema>;

export class CreateMerchantDto implements CreateMerchantSchema {
  @ApiProperty({ name: 'name', example: 'PayNeu Technology' })
  name: string;
}
