import { Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';
import { GetGithubAccessTokenHandler } from './queries/get-github-access-token/get-github-access-token.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
// import { PmpApiServiceConfigService, ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

const QueryHandlers = [GetGithubAccessTokenHandler];

// TODO

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      /*imports: [ServerSharedCoreModule],
      inject: [PmpApiServiceConfigService],
      useFactory: (configService: PmpApiServiceConfigService) => ({
        secret: configService.getJwtSecret()
      })*/
      useFactory: () => ({
        secret: '123'
      })
    })
  ],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}
