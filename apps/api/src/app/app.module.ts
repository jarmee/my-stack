import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';

import { BuildInfoModule } from './api/build-info';
import { Stack, StacksModule } from './api/stacks';
import { StackTechnology } from './api/stacks/technologies';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8081',
      realm: 'my-stack',
      clientId: 'api',
      secret: 'Fhn3Me07pFQmT2y7pD401SXDE8qAObzf',
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
