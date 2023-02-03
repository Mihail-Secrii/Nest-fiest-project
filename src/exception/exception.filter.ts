import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

let prefix;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {
    prefix = this.configService.get<string>('prefix');
  }

  catch(exception: any, host: ArgumentsHost) {
    const httpCode = exception.response.statusCode;
    const response = host.switchToHttp().getResponse();

    console.log(exception.response.message);

    response.redirect(`/${prefix}/exception/${httpCode}`);
  }
}
