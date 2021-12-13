import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class EmployeeDto {
  @ApiProperty({ required: true, description: 'FirstName' })
  @IsString({ message: 'FirstName must be of character type' })
  @IsNotEmpty({ message: 'FirstName can not be empty' })
  readonly first_name: string;

  @ApiProperty({ required: true, description: 'LastName' })
  @IsString({ message: 'LastName must be of character type' })
  @IsNotEmpty({ message: 'LastName can not be empty' })
  readonly last_name: string;
}
