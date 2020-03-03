import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGithubAccessTokenQuery } from './get-github-access-token.query';
import { Platform } from '@pimp-my-pr/shared/domain';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenReadModel } from '../shared/token.read-model';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';

@QueryHandler(GetGithubAccessTokenQuery)
export class GetGithubAccessTokenHandler
  implements IQueryHandler<GetGithubAccessTokenQuery, AuthTokenReadModel> {
  constructor(private authRepository: BaseAuthRepository, private jwtService: JwtService) {}

  async execute(query: GetGithubAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { token } = await this.authRepository.getGithubAccessToken(query.githubCode);

    const jwtPayload = {
      token,
      platform: Platform.github
    };

    return { token: this.jwtService.sign(jwtPayload) };
  }
}
