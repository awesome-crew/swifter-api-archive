import { BaseException } from '@awesome-dev/server-common';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigService } from './config/app';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.enableCors({ credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new BaseException({
          code: 'VALIDATION_FAILED',
          message:
            errors[0].constraints != null
              ? Object.values(errors[0].constraints)[0]
              : `입력값이 잘못됐습니다\n\n- 상세내용\n${JSON.stringify(errors, null, 2)})`,
          status: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('SWIFTER API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
