import { HttpModule, Module } from '@nestjs/common';
import { AuthDataService } from './repositories/auth.data-service';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

@Module({
  imports: [HttpModule, ServerSharedCoreModule],
  providers: [AuthDataService],
  exports: [AuthDataService]
})
export class ServerAuthInfrastructureModule {}
