import { EnumPermission, PERMISSIONS } from '$src/auth/permissions';
import { Config } from '$src/config';
import { EnumResourceType } from '$src/utils/param.model';
import { WebResource, type IWebResource } from '$src/utils/webresources.model';

export enum EnumRole {
  ADMIN = "super_admin",
  USER = "logged_in",
  DEFAULT = "world",
}

// if project has another "users" module, remove some shared props and extend from IUser
export interface IProfile {
  shortname?: string;
  displayname?: string;
  displaynameInput?: IWebResource;

  email?: string;
  mobile?: string;
  isEmailVerified?: boolean; // havint used these
  isMobileVerified?: boolean;
  language?: string;
  forceChange?: boolean;
  role?: EnumRole;
  permissions?: EnumPermission[];
}

export class Profile {


  static NewInstance(data: any): IProfile {
    // map from user first if user module evern needed
    const role = Profile.MapRole(data.roles);
    return {
      shortname: data.shortname,
      displayname: WebResource.MapLanguage(data.displayname),
      displaynameInput: data.displayname,

      email: data.email,
      mobile: data.msisdn,
      role: role,
      language: WebResource.NewInstance(data.language),
      forceChange: data.force_password_change,
      isEmailVerified: data.is_email_verified,
      isMobileVerified: data.is_msisdn_verified,
      permissions: Profile.MapPermissions(role, data.permissions),
    };
  }
  static NewInstances(data: any[]): IProfile[] {
    return data.map(Profile.NewInstance);
  }


  static MapRole(roles: string[]): EnumRole {
    if (!roles?.length) return EnumRole.DEFAULT;

    // map role to enum
    const role = roles[0];
    for (const key in EnumRole) {
      if (EnumRole[key] === role) {
        return EnumRole[key];
      }
    }

    return EnumRole.DEFAULT;
  }

  static MapPermissions(
    role: EnumRole,
    dmartPermissions: any
  ): EnumPermission[] {
    if (!role) return [];
    const perms = PERMISSIONS[role];
    if (!perms) return [];

    // check returned ACL from dmart, only be picky about what to use, mainly create/edit rights
    // for example, evd:__all_subpaths__:content allowed_actions contains create -> add MANAGE_CATEGORIES and MANAGE_DENOMINATIONS
    if (dmartPermissions) {
      if (dmartPermissions['evd:__all_subpaths__:content']?.allowed_actions?.includes('create')) {
        perms.push(EnumPermission.MANAGE_SOMETHING);
      }
    }

    return perms;
  }

  static PrepPost(user: IProfile): any {
    return {
      shortname: user.shortname,
      subpath: Config.API.auth.path,
      resource_type: EnumResourceType.user,
      attributes: {
        displayname: user.displaynameInput,
        language: WebResource.PrepPost(user.language),
        email: user.email,
        msisdn: user.mobile,
      },
    };
  }
  static PrepPassword(user: IProfile, password: string): any {
    return {
      shortname: user.shortname,
      subpath: Config.API.auth.path,
      resource_type: EnumResourceType.user,
      attributes: {
        password: password,
        confirmPassword: password,
        force_password_change: false,
      },
    };
  }
}
