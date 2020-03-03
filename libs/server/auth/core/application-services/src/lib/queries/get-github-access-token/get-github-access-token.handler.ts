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
    // TODO: handle exception
    const githubAccessTokenRes = await this.authRepository.getGithubAccessToken(query.githubCode);

    // TODO: parse to obj
    const githubAccessToken = githubAccessTokenRes.split('&')[0].split('=')[1];

    const jwtPayload = {
      token: githubAccessToken,
      platform: Platform.github
    };

    return { token: this.jwtService.sign(jwtPayload) };
  }
}
