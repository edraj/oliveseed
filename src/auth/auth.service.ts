import { Profile, type IProfile } from '$src/auth/profile.model';
import { ProfileService } from '$src/auth/profile.service';
import { EnumDmartErrorCode } from '$src/core/error.model';
import { HttpService } from '$src/core/http.service';
import { Config } from '../config';
import { AuthUser, type IAuthUser } from './auth.model';
import { AuthState } from './auth.state';

export class AuthService {

  private static async _SaveProfile(res: any, doSync: boolean): Promise<void> {

    const profile = await ProfileService.GetUser();
    // save session again
    AuthState.SavePartial(profile);
  }

  static RequestCode(username: string): Promise<IAuthUser> {
    const data = AuthUser.PrepCode(username);
    return HttpService.httpClient.post(Config.API.auth.otp, data);
  }

  static async Login(username: string, code?: string): Promise<void> {
    // call api, with phone number
    const data = AuthUser.PrepCode(username, code);
    const res = await HttpService.httpClient.post(Config.API.auth.login, data, {
      errorContext: {
        toast: false
      }
    });

    return this._SaveProfile(res, true);

  }

  static async Register(username: string, code?: string): Promise<void> {
  // username is phone number, first send otp, then retrieve and create user

    const data = AuthUser.PrepCreate(username, code);
    const res = await HttpService.httpClient.post(Config.API.auth.register, data, {
      errorContext: {
        swap: [{ from: EnumDmartErrorCode.DATA_SHOULD_BE_UNIQUE, to: EnumDmartErrorCode.OTP_REQUIRED }],
      }
    });

    await this._SaveProfile(res, false);
    return null;

  }


  static async DeleteAccount(userProfile: IProfile): Promise<boolean> {

    const data = Profile.PrepDelete(userProfile);
    await HttpService.httpClient.post(Config.API.auth.profile, data);
    await AuthService.Logout();
    AuthState.Logout();

    return true;
  }

  static async Logout() {
    await HttpService.httpClient.post(Config.API.auth.logout, null, { errorContext: { toast: false } });

  }

}
