import { Global, Module } from '@nestjs/common';
import { ServerAuthCoreApplicationServicesModule } from '@pimp-my-pr/server/auth/core/application-services';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { AuthRepository } from '@pimp-my-pr/server/auth/infrastructure';

const providers = [{ provide: BaseAuthRepository, useClass: AuthRepository }];

@Global()
@Module({
  imports: [ServerAuthCoreApplicationServicesModule],
  providers,
  exports: [...providers, ServerAuthCoreApplicationServicesModule]
})
export class ServerAuthShellModule {}
