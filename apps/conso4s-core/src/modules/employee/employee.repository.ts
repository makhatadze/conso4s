import { EntityRepository, Equal, ILike, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateEmployeeDto,
  EmployeeEntity,
  EmployeeListVo,
  EmployeeReqDto,
  EmployeeStatusEnum,
  EmployeeVo, generateQR,
  mapToObj,
} from '@conso4s/shared';
import { PageEnum } from '@conso4s/shared/enum/page.enum';

@EntityRepository(EmployeeEntity)
export class EmployeeRepository extends Repository<EmployeeEntity> {
  async getEmployees(employeeReqDto: EmployeeReqDto): Promise<EmployeeListVo> {
    const {
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      first_name,
      last_name,
      status,
    } = employeeReqDto;

    const query = new Map();

    if (first_name) {
      query.set('firstName', ILike(first_name));
    }
    if (last_name) {
      query.set('lastName', ILike(last_name));
    }
    if (
      [
        EmployeeStatusEnum.UNKNOWN,
        EmployeeStatusEnum.CHECKED_IN,
        EmployeeStatusEnum.CHECKED_OUT,
      ].includes(Number(status))
    ) {
      query.set('status', Equal(status));
    }

    const data: EmployeeVo[] = await this.createQueryBuilder('employee')
      .select('employee.id', 'id')
      .addSelect('employee.firstName', 'firstName')
      .addSelect('employee.lastName', 'lastName')
      .addSelect('employee.status', 'status')
      .addSelect('employee.createdAt', 'createdAt')
      .addSelect('employee.updatedAt', 'updatedAt')
      .where(mapToObj(query))
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .printSql()
      .getRawMany();
    const total: number = await this.createQueryBuilder('employee')
      .where(mapToObj(query))
      .getCount();

    // For some validations...
    const formatData: EmployeeVo[] = data.map((item) => {
      return item;
    });

    return {
      data: formatData,
      total,
      pageSize,
      pageNumber,
    };
  }

  public async changeStatus(employee: EmployeeEntity) {
    try {
      if (!employee.status) {
        employee.status = 1;
      } else {
        employee.status = employee.status === 1 ? 2 : 1;
      }
      return await employee.save();
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed Employee change status, Error ${err}`,
      );
    }
  }

  /**
   * @param createEmployeeDto
   */
  public async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const { first_name, last_name } = createEmployeeDto;

    try {
      const employee = new EmployeeEntity();
      employee.firstName = first_name;
      employee.lastName = last_name;

      return await employee.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed Employee Creation, Error ${error}`,
      );
    }
  }

  /**
   * @param id
   */
  public async findEmployee(id: number): Promise<EmployeeEntity> {
    try {
      const employee = await this.findOne({ id });
      if (!employee) {
        throw new NotFoundException('EMPLOYEE_NOT_FOUND');
      }

      return employee;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * @param qrString
   */
  public async findEmployeeByQr(qrString: string): Promise<EmployeeEntity> {
    try {
      const employee = await this.findOne({ qrString: qrString });
      if (!employee) {
        throw new NotFoundException('EMPLOYEE_NOT_FOUND');
      }
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
