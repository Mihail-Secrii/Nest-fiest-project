import { Controller, Get, Render, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Roles } from '../roles/roles.decorator';

@Controller()
@Roles('admin')
export class HomeController {
  constructor(private configService: ConfigService) {}

  @Get(['home'])
  @Render('home')
  home() {
    return { prefix: this.configService.get<string>('prefix') };
  }
}
