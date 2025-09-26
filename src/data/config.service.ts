import { Config } from '$src/config';
import type { IConfig } from '$src/data/config.model';
import dataClient from '$src/data/data.http';
import merge from 'lodash.merge';

export class ConfigService {
  // no setter
  private static _config: IConfig;
  static get Config(): IConfig {
    // return new config merged or fallback
    return ConfigService._config || Config;
  }

  private static NewInstance(config: any, withError: boolean) {
    // cast all keys as are
    const _config = merge(Config, <IConfig>config);
    _config.isServed = true;
    _config.withErrors = withError;

    ConfigService._config = _config;
    _seqlog('LoadAppConfig');
  }

  static async LoadConfig(): Promise<boolean> {
    try {
      const res = await dataClient.get(Config.API.local.config + '?v=' + Date.now());
      ConfigService.NewInstance(res, false);
      return true;
    } catch (e) {
      ConfigService.NewInstance(Config, true);
      return true;
    }
  }
}
