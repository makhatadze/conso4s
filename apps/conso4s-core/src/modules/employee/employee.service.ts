import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeRepository } from './employee.repository';
import {
  CreateEmployeeDto,
  EmployeeEntity,
  EmployeeListVo,
  EmployeeReqDto,
  EmployeeStatusEnum,
} from '@conso4s/shared';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  public async getEmployees(
    employeeReqDto: EmployeeReqDto,
  ): Promise<EmployeeListVo> {
    return await this.employeeRepository.getEmployees(employeeReqDto);
  }

  public async getEmployeeById(id: number): Promise<EmployeeEntity> {
    return await this.employeeRepository.findEmployee(id);
  }

  public async scanQrCode(qrString: string): Promise<string> {
    try {
      const employee = await this.employeeRepository.findEmployeeByQr(qrString);
      let response = '';
      if (!employee.status) {
        response = 'Unknown';
      } else {
        response = employee.status === 1 ? 'Checked In' : 'Checked out';
      }
      await this.employeeRepository.changeStatus(employee);
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   *
   * @param createEmployeeDto
   */
  public async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this.employeeRepository.createEmployee(createEmployeeDto);
  }

  /**
   * @param id
   */
  public async deleteEmployee(id: number): Promise<string> {
    await this.employeeRepository.findEmployee(id);

    try {
      const {
        raw: { affectedRows },
      } = await this.employeeRepository.softDelete(id);
      if (affectedRows) {
        return 'Successfully deleted';
      } else {
        return 'Failed to delete';
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
