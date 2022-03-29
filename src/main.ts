import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './modules/app/app.module';
import { WinstonLoggerService } from './modules/logger/logger.service';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
    bodyParser: true
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.text());

  await app.listen(port);
}

bootstrap();
