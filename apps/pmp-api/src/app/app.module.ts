import { Module } from '@nestjs/common';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { ServerAuthShellModule } from '@pimp-my-pr/server/auth/shell';

@Module({
  imports: [ServerRepositoryApiRestModule, ServerSharedCoreModule, ServerAuthShellModule]
})
export class AppModule {}
