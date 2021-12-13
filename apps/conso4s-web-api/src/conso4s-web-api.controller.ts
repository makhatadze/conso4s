import { Controller, Get } from '@nestjs/common';
import { Conso4sWebApiService } from './conso4s-web-api.service';

@Controller()
export class Conso4sWebApiController {
  constructor(private readonly conso4sWebApiService: Conso4sWebApiService) {}

  @Get()
  getHello(): string {
    return this.conso4sWebApiService.getHello();
  }
}
