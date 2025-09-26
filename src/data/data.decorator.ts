import { StorageService } from "./storage.service";


interface ICached {
  key: string;
  withArgs: boolean;
  expiresin: number; // hours
}


export function DataCache<T>(options?: Partial<ICached>) {
  return  function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // save a reference to the original method

    // NOTE: Do not use arrow syntax here. Use a function expression in
    // order to use the correct value of `this` in this method (see notes below)
    // here, find element in cache, and return it if found
    const cacheKey = options?.key || `${propertyKey}`;

    descriptor.value = async function (...args: any[]): Promise<any> {

      const key = options?.withArgs ? `${cacheKey}_${JSON.stringify(args)}` : cacheKey;

      const _data: any = StorageService.SiteStorage.getCache(key);
      if (_data) {
        // if localStroage exist, return
        _debug(_data, "Cached " + cacheKey);
        return _data;
      }

      const response = await originalMethod.apply(this, args);
      StorageService.SiteStorage.setCache(key, response, options?.expiresin);
      return response;

    };

    return descriptor;
  };
}


// clear before applying
export function ClearCache<T>(options?: Partial<ICached>) {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // exact key
    const cacheKey = options?.key;

    descriptor.value = async function (...args: any[]): Promise<any> {

      StorageService.SiteStorage.removeCache(cacheKey);

      return await originalMethod.apply(this, args);

    };

    return descriptor;
  };
}
