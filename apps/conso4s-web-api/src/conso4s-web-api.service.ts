import { Injectable } from '@nestjs/common';

@Injectable()
export class Conso4sWebApiService {
  getHello(): string {
    return 'conso4s web api';
  }
}
