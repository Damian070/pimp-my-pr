import { HttpService, Injectable } from '@nestjs/common';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';
import { githubConfig, PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';

@Injectable()
export class AuthRepository extends BaseAuthRepository {
  endpoints = {
    getGithubAccessToken: urlFactory(githubConfig.authUrl)
  };

  constructor(private httpService: HttpService, private configService: PmpApiServiceConfigService) {
    super();
  }

  getGithubAccessToken(githubCode: string): Promise<string> {
    const githubSecrets = {
      client_id: this.configService.getGithubClientId(),
      client_secret: this.configService.getGithubClientSecret(),
      code: githubCode
    };

    // TODO: returns 200 when verification code is bad
    return this.httpService
      .post<string>(this.endpoints.getGithubAccessToken.url(), githubSecrets)
      .pipe(map(res => res.data))
      .toPromise();
  }
}
