// user.ts
import { browser } from '$app/environment';
import { Config } from '$src/config';
import { ConfigService } from '$src/data/config.service';
import { StorageService } from '$src/data/storage.service';
import { get, writable } from 'svelte/store';
import type { IAuthUser } from './auth.model';
import type { IProfile } from './profile.model';

export class AuthState {
  // may be these should be shielded later
  static authUser = writable({} as IAuthUser);
  static profile = writable({} as IProfile);

  static get redirectUrl(): string {
    return StorageService.SiteStorage.getItem(Config.Auth.redirectKey);
  }
  static set redirectUrl(value: string) {
    if (!value) {
      StorageService.SiteStorage.removeItem(Config.Auth.redirectKey);
    } else {
      StorageService.SiteStorage.setItem(Config.Auth.redirectKey, value);
    }
  }

  static get ForceChange(): boolean {
    return AuthState.currentState?.payload?.forceChange || false;
  }

  static CheckAuth(user: IAuthUser) {
    if (!user || !user.accessToken) {
      return false;
    }

    if (Date.now() > user.expiresAt) {
      return false;
    }
    return true;
  }
  static GetToken() {
    const _auth = AuthState.currentState;
    return AuthState.CheckAuth(_auth) ? _auth.accessToken : null;
  }

  static get currentState(): IAuthUser {
    if (browser) {
      return StorageService.SiteStorage.getItem(ConfigService.Config.Auth.userAccessKey);
    }
    // server, not yet res.locals.user
    return null;
  }

  static SavePartial(profile: IProfile) {
    const _newpayload = { ...get(AuthState.authUser), payload: { ...get(AuthState.authUser).payload, ...profile } };
    AuthState.SaveSession(_newpayload);
  }

  static SaveSession(auth: IAuthUser): IAuthUser | null {
    if (auth.accessToken) {
      // save user in localstorage, this is called only from clientside login call
      StorageService.SiteStorage.setItem(ConfigService.Config.Auth.userAccessKey, auth, 1);
      // set store
      AuthState.SetState(auth);

      return auth;
    } else {
      StorageService.SiteStorage.removeItem(ConfigService.Config.Auth.userAccessKey);
      return null;
    }
  }
  static SetState(auth: IAuthUser) {
    if (auth) {
      AuthState.authUser.set(auth);
      AuthState.profile.set(auth.payload);
    }
  }

  static GetUser(): IProfile {
    // get writable
    return get(AuthState.profile);
  }
  static Logout(soft: boolean = false) {
    StorageService.SiteStorage.removeItem(ConfigService.Config.Auth.userAccessKey);
    // also need to clean third party cookie from service

    AuthState.authUser.set(null);
    AuthState.profile.set(null);

    if (!soft) {
      AuthState.redirectUrl = null;
    }
  }
}
