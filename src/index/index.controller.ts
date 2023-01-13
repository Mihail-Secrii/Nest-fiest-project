import {Controller, Get, Param, Render, Req, Res} from '@nestjs/common';
import { Response } from 'express';

@Controller('GreenGame')
export class IndexController {
  @Get('home')
  @Render('index')
  index(@Req() request: Request) {

  }
}
