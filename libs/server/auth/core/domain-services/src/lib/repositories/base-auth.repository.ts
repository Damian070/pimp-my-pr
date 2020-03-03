import { AuthTokenEntity } from '../../../../domain/src/lib/entities/auth-token.entity';

export abstract class BaseAuthRepository {
  abstract getGithubAccessToken(githubCode: string): Promise<AuthTokenEntity>;
}
