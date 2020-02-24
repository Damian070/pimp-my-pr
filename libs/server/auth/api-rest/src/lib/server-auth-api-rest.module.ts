import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ServerAuthCoreApplicationServicesModule } from '@pimp-my-pr/server/auth/core/application-services';

@Module({
  imports: [ServerAuthCoreApplicationServicesModule],
  controllers: [AuthController]
})
export class ServerAuthApiRestModule {}
