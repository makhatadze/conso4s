import { ApiProperty } from '@nestjs/swagger';
import { QueryListVo } from '../query.list.vo';
import { QueryVo } from '../query.vo';

export class EmployeeVo extends QueryVo {
  @ApiProperty({ description: 'FirstName' })
  username?: string;

  @ApiProperty({ description: 'LastName' })
  email?: string;

  @ApiProperty({
    description:
      'Status, 0 means Unknown, 1 means Checked In, 2 means Checked Out',
  })
  status?: number;
}

export class EmployeeListVo extends QueryListVo {
  @ApiProperty({
    description: 'Return data list',
    type: EmployeeVo,
    isArray: true,
  })
  data: EmployeeVo[];
}
