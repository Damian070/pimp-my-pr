export abstract class BaseAuthRepository {
  abstract getGithubAccessToken(githubCode: string): Promise<string>;
}
