// user.ts
import { browser } from "$app/environment";
import { Config } from "$src/config";
import { SiteStorage } from "$src/data/storage.service";
import { Res } from "$utils/resources";
import { get, writable } from "svelte/store";
import type { IAuthUser } from "./auth.model";
import type { IProfile } from "./profile.model";

export class AuthState {
  // may be these should be shielded later
  static authUser = writable({} as IAuthUser);
  static profile = writable({} as IProfile);

  static get redirectUrl(): string {
    return SiteStorage.getItem(Config.Auth.redirectKey);
  }
  static set redirectUrl(value: string) {
  if (!value) {
    SiteStorage.removeItem(Config.Auth.redirectKey);
  } else {
      // remove language
      SiteStorage.setItem(Config.Auth.redirectKey, value?.replace(Res.Re, ''));
    }
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


  static get currentState() {
    if (browser) {
      return SiteStorage.getItem(Config.Auth.userAccessKey);
    }
    // server, not yet res.locals.user
    return null;
  }

  static SaveSession(auth: IAuthUser): IAuthUser | null {
    if (auth.accessToken) {
      // save user in localstorage, this is called only from clientside login call
      SiteStorage.setItem(Config.Auth.userAccessKey, auth);
      // set store
      AuthState.SetState(auth);

      return auth;
    } else {
      SiteStorage.removeItem(Config.Auth.userAccessKey);
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
    SiteStorage.removeItem(Config.Auth.userAccessKey);
    // also need to clean third party cookie from service

    AuthState.authUser.set(null);
    AuthState.profile.set(null);

    // sometimes the logout is soft (due to server timeout), keep redirect url
    if (!soft) {
      AuthState.redirectUrl = null;
    }
  }
}
