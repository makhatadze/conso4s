import { ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateIf, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryOptionsDto } from '@conso4s/shared/dto/query.options.dto';

export class EmployeeReqDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: 'first_name' })
  @IsOptional()
  readonly first_name?: string;

  @ApiPropertyOptional({ required: false, description: 'last_name' })
  @IsOptional()
  readonly last_name?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'status',
    enum: [0, 1, 2],
  })
  @IsEnum(
    { UNKNOWN: 0, CHECKED_IN: 1, CHECKED_OUT: 2 },
    {
      message:
        'The status must be a number (0 means Unknown, 1 means Checked In, 2 means Checked Out)',
    },
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform != '')
  @IsOptional()
  readonly status?: number;
}
