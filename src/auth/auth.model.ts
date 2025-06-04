import { Profile, type IProfile } from "./profile.model";

export interface IAuthUser {
  accessToken?: string;
  expiresAt?: number;
  payload?: IProfile;
}

export class AuthUser {
  static NewInstance(res: any): IAuthUser {
    // decode res.access_token
    const _res = JSON.parse(atob(res.access_token.split(".")[1]));
    if (!_res) return null;

    return {
      accessToken: res.access_token,
      expiresAt: _res.expires * 1000,
      payload: Profile.NewInstance(res), // this has shortname
    };
  }
}
