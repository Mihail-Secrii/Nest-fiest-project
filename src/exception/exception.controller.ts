import {Controller, Get, Param, Render} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

let response;

@Controller('exception')
export class ExceptionController {
  constructor(private configService: ConfigService) {
    response = { prefix: this.configService.get<string>('prefix') };
  }

  @Get()
  @Render('exception')
  default(@Param() params) {
    console.log(params);
    return response;
  }

  @Get(':httpCode')
  @Render('exception')
  exception(@Param() params) {
    response.code = params.httpCode;

    console.log(response);
    return response;
  }
}
