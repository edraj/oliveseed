import { Profile, type IProfile } from '$src/auth/profile.model';
import { HttpService } from '$src/core/http.service';
import { mapResponse } from '$src/core/response.model';
import { Config } from '../config';
import { AuthState } from './auth.state';

export class ProfileService {


  static async GetUser(): Promise<IProfile> {
    const res = await HttpService.httpClient.get(Config.API.auth.profile);
    return Profile.NewInstance(mapResponse(res));
  }

  static RequestCode(email: string): Promise<any> {
    const data = Profile.PrepCode(email);
    return HttpService.httpClient.post(Config.API.auth.otp, data);
  }

  static async UpdateProfile(userProfile: IProfile): Promise<void> {

    const data = Profile.PrepPost(userProfile);
    await HttpService.httpClient.post(Config.API.auth.profile, data);
    AuthState.SavePartial(userProfile);
    return null;
  }


  static async VerifyEmail(userProfile: IProfile, code?: string): Promise<void> {

    const data = Profile.PrepVerify(userProfile, code);
    await HttpService.httpClient.post(Config.API.auth.profile, data);
    AuthState.SavePartial({...userProfile, isEmailVerified: true});
    return null;
  }



}
