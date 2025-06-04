import httpClient from "$core/http.service";
import { mapResponse } from "$src/core/response.model";
import { AuthUser, type IAuthUser } from "./auth.model";
import { AuthState } from "./auth.state";
import { Profile } from "./profile.model";

export class AuthService {
  static async Login(username: string, password: string): Promise<IAuthUser> {
    // call api
    const res = await httpClient.login(username, password);

    // map
    const user = AuthUser.NewInstance(mapResponse(res));

    // since we will always need profile, call GetUser here
    const profile = await AuthService.GetUser();

    const _authUser: IAuthUser = {
      ...user,
      payload: { ...user.payload, ...profile },
    };

    // save session here
    return AuthState.SaveSession(_authUser);
  }

  static async GetUser() {
    // careful, this depends on already logged in user and saved in cross domain cookie
    const res = await httpClient.get_profile();
    return Profile.NewInstance(mapResponse(res));
  }
}
