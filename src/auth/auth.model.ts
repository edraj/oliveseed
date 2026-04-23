import { Config } from '$src/config';
import { cleanPhone } from '$src/utils/common';
import { EnumResourceType } from '$src/utils/param.model';
import { Profile, type IProfile } from './profile.model';

export interface IAuthUser {
  accessToken?: string;
  expiresAt?: number;
  payload?: IProfile;
  type?: 'web' | 'mobile';
}

export class AuthUser {
  static NewInstance(res: any): IAuthUser {
    // decode res.access_token
    const _res = JSON.parse(atob(res.access_token.split('.')[1]));
    if (!_res) return null;

    return {
      accessToken: res.access_token,
      expiresAt: _res.expires * 1000,
      type: res.type,
      payload: Profile.NewInstance(res), // this has shortname
    };
  }

  static PrepCode(username: string, code?: string): any {
    // clean up username, if it starts with +, remove +, if it starts with 964, keep, if it starts with 0, strip then prefix with 964, if it starts with 7, prefix with 964
    return {
      msisdn: cleanPhone(username),
      otp: code,
    };
  }
  static PrepCreate(shortname: string, code?: string): any {
    return {
      shortname: Config.API.autoShortname, // cleanPhone(shortname), // mobile
      subpath: Config.API.auth.path,
      resource_type: EnumResourceType.user,
      attributes: {
        type: 'web',
        msisdn_otp: code,
        msisdn: cleanPhone(shortname),
        is_msisdn_verified: true,
        is_email_verified: false,
      },
    };
  }
}
