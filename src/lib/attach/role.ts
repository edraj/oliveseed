import { AuthState } from '$src/auth/auth.state';
import type { EnumPermission } from '$src/auth/permissions';
import type { EnumRole } from '$src/auth/profile.model';
import type { Attachment } from 'svelte/attachments';


export function forRole(roles: EnumRole[]): Attachment {
  return (element: HTMLElement) => {
    // show if user role = to role passed
    const user = AuthState.GetUser();
    if (!roles.includes(user.role)) {
      element.outerHTML = '';
    }

    return () => {
      // destroy
    };
  };

};


export function forPermission(permission: EnumPermission, removeLink: boolean = false): Attachment {
  return (element: HTMLElement) => {
    const user = AuthState.GetUser();
    if (!user.permissions.includes(permission)) {
      if (removeLink) {
        element.outerHTML = element.innerHTML;
      }
      else element.outerHTML = '';
    }

    return () => {
      // destroy
    };
  };

};

