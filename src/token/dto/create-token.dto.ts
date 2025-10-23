import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateTokenSchema = z.object({
  address: z.string(),
  name: z.string(),
});

type CreateTokenSchema = z.infer<typeof CreateTokenSchema>;

export class CreateTokenDto implements CreateTokenSchema {
  @ApiProperty({ example: '0x35435120c2cf51f7f122f2b37bda3bbc686831de' })
  address: string;

  @ApiProperty({ example: 'Bazed Token' })
  name: string;
}
