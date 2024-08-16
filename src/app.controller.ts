import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('공용')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'health check용 엔드포인트' })
  @Get()
  greeting(): string {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <title>SWIFTER API</title>
  </head>
  <body>
    <h1>SWIFTER API</h1>
    <p>기업 교육 플랫폼</p>
    <ul>
      <li>
        <a href="https://swifterkorea.site">Homepage</a>
      </li>
    </ul>
  </body>
</html>
    `;
  }

  @ApiOperation({ summary: '무조건 에러를 발생시키는 엔드포인트' })
  @Get('/error')
  error() {
    throw new Error('Hello Error!');
  }
}
