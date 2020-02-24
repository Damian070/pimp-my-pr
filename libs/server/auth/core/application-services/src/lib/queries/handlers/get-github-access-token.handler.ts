import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGithubAccessTokenQuery } from '../get-github-access-token.query';
import { AuthResponse, Platform } from '@pimp-my-pr/shared/domain';
import { AuthDataService } from '@pimp-my-pr/server/auth/infrastructure';
import { JwtService } from '@nestjs/jwt';

@QueryHandler(GetGithubAccessTokenQuery)
export class GetGithubAccessTokenHandler
  implements IQueryHandler<GetGithubAccessTokenQuery, AuthResponse> {
  constructor(private authDataService: AuthDataService, private jwtService: JwtService) {}

  async execute(query: GetGithubAccessTokenQuery): Promise<AuthResponse> {
    // TODO: handle exception
    const githubAccessTokenRes = await this.authDataService.getGithubAccessToken(query.githubCode);

    // TODO: parse to obj
    const githubAccessToken = githubAccessTokenRes.split('&')[0].split('=')[1];

    const jwtPayload = {
      token: githubAccessToken,
      platform: Platform.github
    };

    return { token: this.jwtService.sign(jwtPayload) };
  }
}
