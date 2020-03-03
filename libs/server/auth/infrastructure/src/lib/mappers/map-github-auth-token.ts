import { AuthTokenEntity } from '../../../../core/domain/src/lib/entities/auth-token.entity';
import { plainToClass } from '@marcj/marshal';

export function mapGithubAuthToken(authToken: Record<string, string>): AuthTokenEntity {
  return plainToClass(AuthTokenEntity, {
    ...authToken,
    token: authToken.access_token,
    type: authToken.token_type
  });
}
