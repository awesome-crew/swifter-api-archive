import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRootAsync(__dirname)],
})
export class DatabaseProviderModule {}
