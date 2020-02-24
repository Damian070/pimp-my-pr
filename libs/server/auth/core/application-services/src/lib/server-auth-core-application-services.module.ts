import { Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';
import { GetGithubAccessTokenHandler } from './queries/handlers/get-github-access-token.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ServerAuthInfrastructureModule } from '@pimp-my-pr/server/auth/infrastructure';
import { PmpApiServiceConfigService, ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

const QueryHandlers = [GetGithubAccessTokenHandler];

@Module({
  imports: [
    CqrsModule,
    ServerAuthInfrastructureModule,
    JwtModule.registerAsync({
      imports: [ServerSharedCoreModule],
      inject: [PmpApiServiceConfigService],
      useFactory: (configService: PmpApiServiceConfigService) => ({
        secret: configService.getJwtSecret()
      })
    })
  ],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}
