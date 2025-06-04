import type { StorageService } from "./storage.service";

export interface IStorageService {
  storageService: StorageService;
}

interface ICached {
  key: string;
  withArgs: boolean;
  expiresin: number; // hours
}

// TODO: figure out a way for this
const locks: { [key: string]: boolean } = {};

export function DataCache<T extends IStorageService>(options?: Partial<ICached>) {
  return  function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // save a reference to the original method

    // NOTE: Do not use arrow syntax here. Use a function expression in
    // order to use the correct value of `this` in this method (see notes below)
    // here, find element in cache, and return it if found


    const cacheKey = options?.key || `${propertyKey}`;

    descriptor.value = async function (...args: any[]): Promise<any> {

      const key = options?.withArgs ? `${cacheKey}_${JSON.stringify(args)}` : cacheKey;

      const _data: any = this.storageService.getCache(key);
      if (_data) {
        // if localStroage exist, return
        _debug(_data, "Cached " + cacheKey);
        return _data;
      }

      const response = await originalMethod.apply(this, args);
      this.storageService.setCache(key, response, options?.expiresin);
      return response;

    };

    return descriptor;
  };
}
