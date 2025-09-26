import { EnumRole } from '$src/auth/profile.model';

export enum EnumPermission {
  VIEW_SOMETHING,
  MANAGE_SOMETHING,
  // add specific ui perimssions here
}

export const PERMISSIONS = {
  // add default permissions besides those coming back from dmart
  [EnumRole.ADMIN]: [
    EnumPermission.VIEW_SOMETHING,
    EnumPermission.MANAGE_SOMETHING,
  ],
  [EnumRole.DEFAULT]: [
  ],
  [EnumRole.USER]: [
    EnumPermission.VIEW_SOMETHING,
  ]
};
