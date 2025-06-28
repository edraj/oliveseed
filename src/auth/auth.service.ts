import { mapResponse } from '$src/core/response.model';
import { Config } from '../config';
import httpClient from '../core/http.service';
import { AuthUser, type IAuthUser } from './auth.model';
import { AuthState } from './auth.state';
import { Profile } from './profile.model';

export class AuthService {
  static async Login(username: string, password: string): Promise<IAuthUser> {
    // call api
    const res = await httpClient.post(Config.API.auth.login, { shortname: username, password });

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

  static async GetUser() {
    const res = await httpClient.get(Config.API.auth.profile);
    return Profile.NewInstance(mapResponse(res));
  }

  static async Logout() {
    return await httpClient.post(Config.API.auth.logout);
  }
}
