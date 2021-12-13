import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, ValidateIf, IsOptional } from 'class-validator';
import { EmployeeDto } from '@conso4s/shared/dto/employee/employee.dto';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto extends EmployeeDto {
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
  @ValidateIf((o) => o.status != '')
  @IsOptional()
  readonly status?: number;
}
