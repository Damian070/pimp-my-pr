import { Module } from '@nestjs/common';
import { ServerAuthApiRestModule } from '@pimp-my-pr/server/auth/api-rest';

@Module({
  imports: [ServerAuthApiRestModule]
})
export class ServerAuthShellModule {}
