import { NestFactory, Reflector } from '@nestjs/core';
import { RouteModule } from './route.module';
import { join } from 'path';
import * as hbs from 'hbs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { RolesGuard } from './roles/roles.guard';

const logger = {
  logger: {
    file: join(__dirname, '..', 'logs/debug.log'),
  },
};
const styleOptions = {
  root: join(__dirname, '..', 'public'),
  cacheControl: true,
  preCompressed: true,
  extensions: ['css'],
};
const engineOptions = {
  engine: hbs,
  root: join(__dirname, '..', 'views'),
  viewExt: 'hbs',
};
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      styleSrc: [
        `'self'`,
        `'unsafe-inline'`,
        'cdn.jsdelivr.net',
        'fonts.googleapis.com',
      ],
      fontSrc: [`'self'`, 'fonts.gstatic.com'],
      imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
    },
  },
  crossOriginOpenerPolicy: false,
  originAgentCluster: false,
  crossOriginEmbedderPolicy: {
    policy: 'require-corp',
  },
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    RouteModule,
    new FastifyAdapter(logger),
  );

  app.useStaticAssets(styleOptions);
  app.setViewEngine(engineOptions);
  app.enableCors();
  app.useGlobalGuards(new RolesGuard(new Reflector()));

  hbs.registerPartials(join(__dirname, '..', 'views/template'));

  // await app.register(fastifyHelmet, );
  await app.register(fastifyCsrf);
  await app.listen(3000);
}

bootstrap();
