import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto, EmployeeEntity,
  EmployeeReqDto,
  generateQR,
  ResponseCreator,
} from '@conso4s/shared';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern({ cmd: 'GET_EMPLOYEES' })
  public async getEmployees(@Payload() employeeReqDto: EmployeeReqDto) {
    const employees = await this.employeeService.getEmployees(employeeReqDto);
    return new ResponseCreator('GET_EMPLOYEES', employees);
  }

  @MessagePattern({ cmd: 'GET_EMPLOYEE_BY_ID' })
  public async getQrCodeById(@Payload() id: number) {
    try {
      const employee = await this.employeeService.getEmployeeById(id);
      const url = `http://localhost:3000/employee/${employee.qrString}/scan-qrcode`;

      return `<!doctype html>
        <head>
          <title>${employee.firstName} ${employee.lastName} - QR Code</title>
        </head>
        <body>
         <img src=${await generateQR(url)}>
        </body>
      </html>`;
    } catch (err) {
      console.log(err);
    }
    return;
  }

  @MessagePattern({ cmd: 'CREATE_EMPLOYEE' })
  public async createEmployee(@Payload() data: CreateEmployeeDto) {
    const newEmployee = await this.employeeService.createEmployee(data);
    return new ResponseCreator('CREATE_EMPLOYEE', newEmployee);
  }

  @MessagePattern({ cmd: 'DELETE_EMPLOYEE' })
  public async deleteEmployee(@Payload() id: number) {
    const employee = await this.employeeService.deleteEmployee(id);
    return new ResponseCreator('DELETE_EMPLOYEE', employee);
  }

  @MessagePattern({ cmd: 'SCAN_QR_CODE' })
  public async scanQrCode(qrCode: string): Promise<ResponseCreator> {
    const employee = await this.employeeService.scanQrCode(qrCode);
    return new ResponseCreator('SCAN_QR_CODE', employee);
  }
}
