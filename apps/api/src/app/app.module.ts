import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuildInfoModule } from './api/build-info';
import { Stack, StacksModule } from './api/stacks';
import { StackTechnology } from './api/stacks/technologies';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') ?? 'localhost',
        port: config.get('DB_PORT') ?? 5432,
        username: config.get('DB_USER') ?? 'root',
        password: config.get('DB_PASS') ?? 'secret',
        database: 'mystack',
        entities: [Stack, StackTechnology],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BuildInfoModule,
    StacksModule,
  ],
})
export class AppModule {}
