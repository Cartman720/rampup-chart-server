import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './modules/app/app.module';
import { WinstonLoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.use(helmet());
  app.use(cookieParser());

  await app.listen(port);
}

bootstrap();
