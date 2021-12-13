import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateEmployeeDto,
  EmployeeListVo,
  EmployeeReqDto,
  EmployeeVo,
} from '@conso4s/shared';
import { Observable } from 'rxjs';
import * as QRCode from 'qrcode';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(@Inject('MAIN_SERVICE') private readonly client: ClientProxy) {}

  @ApiOperation({
    summary: 'Query account information',
    description: 'Query account information based on employee id',
  })
  @ApiOkResponse({
    type: EmployeeVo,
    description: 'Query the return value of a single employee',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async accountById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Observable<EmployeeVo>> {
    const pattern = { cmd: 'GET_EMPLOYEE_BY_ID' };
    return this.client.send(pattern, id);
  }

  @ApiOperation({
    summary: 'Query account information',
    description: 'Query account information based on employee id',
  })
  @ApiOkResponse({
    type: EmployeeVo,
    description: 'Query the return value of a single employee',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id/qrcode')
  async qrCodeById(@Param('id', new ParseIntPipe()) id: number) {
    const pattern = { cmd: 'GET_EMPLOYEE_BY_ID' };
    return this.client.send(pattern, id);
  }

  @ApiOperation({
    summary: 'Query account information',
    description: 'Query account information based on employee id',
  })
  @ApiOkResponse({
    type: EmployeeVo,
    description: 'Query the return value of a single employee',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':qr_string/scan-qrcode')
  async scanQrCodeByEmployee(
    @Param('qr_string', new ParseIntPipe()) qr_string: string,
  ) {
    const pattern = { cmd: 'SCAN_QR_CODE' };
    return this.client.send(pattern, qr_string);
  }

  @ApiOperation({
    summary: 'Query account list',
    description: 'Query account list based on conditions',
    externalDocs: {
      url: 'xx?pageSize=10&pageNumber=1&username=xx&email=xx&mobile=xx&status=0&platform=1',
    },
  })
  @ApiOkResponse({
    type: EmployeeListVo,
    description: 'Page query employee return value',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async accountList(
    @Query() employeeReqDto: EmployeeReqDto,
  ): Promise<Observable<EmployeeListVo>> {
    const pattern = { cmd: 'GET_EMPLOYEES' };
    return this.client.send(pattern, employeeReqDto);
  }

  @ApiOperation({
    summary: 'Create an employee',
    description: 'Create an employee',
  })
  @ApiOkResponse({
    type: String,
    description: 'Create employee return value',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAccount(@Body() createEmployeeDto: CreateEmployeeDto) {
    const pattern = { cmd: 'CREATE_EMPLOYEE' };
    return this.client.send(pattern, createEmployeeDto);
  }

  @ApiOperation({
    summary: 'Delete resource',
    description: 'Delete resources based on resource ID',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroyAccessById(@Param('id', new ParseIntPipe()) id: number) {
    const pattern = { cmd: 'DELETE_EMPLOYEE' };
    return this.client.send(pattern, id);
  }
}
