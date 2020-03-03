import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthResponse } from '@pimp-my-pr/shared/domain';
import { GetGithubAccessTokenQuery } from './queries/get-github-access-token/get-github-access-token.query';

@Injectable()
export class AuthFacade {
  constructor(private queryBus: QueryBus) {}

  getGithubAccessToken(githubCode: string): Promise<AuthResponse> {
    return this.queryBus.execute(new GetGithubAccessTokenQuery(githubCode));
  }
}
