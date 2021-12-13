import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';

import { Transform, TransformFnParams } from 'class-transformer';

import { EmployeeStatusEnum } from '@conso4s/shared/enum';

@Entity('employee')
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Primary Key Id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'first_name',
    comment: 'employee first name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'last_name',
    comment: 'employee last name',
  })
  lastName: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'status',
    default: 0,
    comment: 'Status: 0 means Unknown, 1 means Checked In, 2 means Checked Out',
  })
  status: EmployeeStatusEnum;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'qr_string',
    nullable: true,
    comment: 'qr code',
  })
  qrString: string;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: 'Created At',
  })
  createdAt: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: 'Updated At',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'deleted_at',
    select: false,
    comment: 'Soft Delete At',
  })
  deletedAt: Date;

  @BeforeInsert()
  generateUserNameOrEmailOrMobile() {
    this.qrString = '_' + Math.random().toString(36).substr(2, 16);
  }
}
