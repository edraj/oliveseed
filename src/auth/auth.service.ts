import { EnumDmartErrorCode } from '$src/core/error.model';
import { HttpService } from '$src/core/http.service';
import { mapResponse } from '$src/core/response.model';
import { Config } from '../config';
import { AuthUser, type IAuthUser } from './auth.model';
import { AuthState } from './auth.state';
import { Profile, type IProfile } from './profile.model';

export class AuthService {
  static async Login(username: string, password: string, invitation?: string): Promise<IAuthUser> {
    // call api
    const _username = username.replace(/\s+/g, '');
    const res = await HttpService.httpClient.post(Config.API.auth.login, { shortname: _username, password, invitation }, {
      params: {
        replaceCode: [
          { from: EnumDmartErrorCode.UNPROCESSABLE_ENTITY, to: EnumDmartErrorCode.INVALID_USERNAME_AND_PASS }
        ]
      }
    });

    const user = AuthUser.NewInstance(mapResponse(res));
    AuthState.SaveSession(user);
    const profile = await AuthService.GetUser();

    const _authUser: IAuthUser = {
      ...user,
      payload: { ...user.payload, ...profile },
    };

    // save session again
    return AuthState.SaveSession(_authUser);
  }
  static async LoginByInvite(username: string, invitation: string): Promise<IAuthUser> {
    return AuthService.Login(username, null, invitation);
  }

  static async GetUser() {
    const res = await HttpService.httpClient.get(Config.API.auth.profile);
    return Profile.NewInstance(mapResponse(res));
  }

  static async Logout() {
    await HttpService.httpClient.post(Config.API.auth.logout, null, { params: { toast: false } });
  }

  static async UpdateProfile(userProfile: IProfile): Promise<void> {
    const req: any = Profile.PrepPost(userProfile);

    await HttpService.httpClient.post(Config.API.auth.profile, req);

    AuthState.SavePartial(userProfile);
    return null;
  }

  static async UpdatePassword(userProfile: IProfile, password: string): Promise<void> {
    const req: any = Profile.PrepPassword(userProfile, password);
    await HttpService.httpClient.post(Config.API.auth.profile, req);
    AuthState.SavePartial({ ...userProfile, forceChange: false });
    return null;
  }

  static async SendRequest(username: string): Promise<void> {
    await HttpService.httpClient.post(Config.API.auth.reset, { shortname: username });
    return null;
  }
}
