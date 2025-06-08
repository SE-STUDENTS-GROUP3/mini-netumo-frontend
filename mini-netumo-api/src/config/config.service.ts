import { config } from 'dotenv';
config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      // throw new Error(`config error - missing env.${key}`);
    }

    return value as string;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getAppUrl() {
    return this.getValue('APP_URL') ?? 'http://localhost:3000';
  }

  public getPort() {
    return this.getValue('SERVER_PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTokenConfig(): any {
    return {
      secret: this.getValue('SECRET'),
      refreshTokenSecret: this.getValue('REFRESH_TOKEN_SECRET'),
      tokenLife: parseInt(this.getValue('TOKEN_LIFE')),
      refreshTokenLife: parseInt(this.getValue('REFRESH_TOKEN_LIFE')),
    };
  }

  public getStorageConfig(): any {
    const dateStrPrefix = new Date().toISOString().split('T')[0];
    return {
      accessKeyId: this.getValue('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.getValue('AWS_SECRET_ACCESS_KEY'),
      region: this.getValue('AWS_DEFAULT_REGION'),
      bucket:
        this.getValue('AWS_BUCKET') || this.getValue('AWS_S3_BUCKET_NAME'),
      basePath: `app/${dateStrPrefix}`,
      fileSize: 1000 * 1024 * 1024,
      acl: 'private',
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'SECRET',
  'REFRESH_TOKEN_SECRET',
  'TOKEN_LIFE',
  'REFRESH_TOKEN_LIFE',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'SERVER_PORT',
]);

export { configService };
