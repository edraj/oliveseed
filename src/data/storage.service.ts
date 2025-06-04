import { browser } from "$app/environment";
import { Config } from "$src/config";
import { Res } from "$utils/resources";

export class StorageService {
  private get ourStorage(): Storage {
    if (browser) {
      return localStorage;
    }
    // TODO: create a nodejs empty localstorage
    return {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
      key: () => null,
      length: 0,
      clear: () => null,
    };
  }

  constructor() {
    if (browser) {
      this._setResetKey();
    }
  }

  private getKey(key: string, withLanguage = false): string {
    return `${Config.Cache.Key}${
      withLanguage ? "." + Res.language : ""
    }.${key}`;
  }

  private _setResetKey(): void {
    const _key = this.getKey(Config.Cache.ResetKey);
    const _reset: any = this.ourStorage.getItem(_key);
    // if it does not exist, it must have changed in config, remove everything
    if (!_reset || _reset !== "true") {
      this.clear();
      this.ourStorage.setItem(_key, "true");
    }
  }

  setItem(
    key: string,
    value: any,
    expiresin: number = Config.Cache.Timeout,
    withLanguage = false
  ): void {
    // set cache with expiration time stamp, each obect has its own? or one for all?
    const _storage: any = {
      value: value,
      timestamp: Date.now(), // in milliseconds
      expiresin: expiresin, // in hours
    };

    this.ourStorage.setItem(
      this.getKey(key, withLanguage),
      JSON.stringify(_storage)
    );
  }

  getItem(key: string, withLanguage = false): any {
    // if browser get storage, else return null

    const _key = this.getKey(key, withLanguage);
    const value: any = this.ourStorage.getItem(_key);

    if (value) {
      const _value: any = JSON.parse(value);

      // calculate expiration
      if (Date.now() - _value.timestamp > _value.expiresin * 3600000) {
        this.removeItem(_key);
        return null;
      }

      return _value.value;
    }
    return null;
  }

  removeItem(key: string, withLanguage = false) {
    this.ourStorage.removeItem(this.getKey(key, withLanguage));
  }
  setCache(
    key: string,
    value: any,
    expiresIn: number = Config.Cache.Timeout
  ): void {
    this.setItem(key, value, expiresIn, true);
  }
  getCache(key: string): any {
    return this.getItem(key, true);
  }
  removeCache(key: string) {
    this.removeItem(key, true);
  }

  clear(): void {
    // remove all prefix
    const toClear = [];

    for (let i = 0; i < this.ourStorage.length; i++) {
      const name = this.ourStorage.key(i);
      if (name?.indexOf(Config.Cache.Key) === 0) {
        // delay
        toClear.push(name);
      }
    }
    toClear.forEach((n) => this.ourStorage.removeItem(n));
  }
}

export const SiteStorage = new StorageService();
