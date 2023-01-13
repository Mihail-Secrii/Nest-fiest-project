import { NestFactory } from '@nestjs/core';
import { RouteModule } from './route.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    RouteModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('hbs'),
    },
    templates: join(__dirname, '..', 'views'),
    viewExt: 'hbs',
  });

  hbs.registerPartials(join(__dirname, '..', 'views/template'));
  await app.listen(3000);
}
bootstrap();
