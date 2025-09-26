import { goto } from '$app/navigation';
import { Config } from '$src/config';
import { routeLink } from '$src/utils/route';
import { AuthState } from './auth.state';
import { EnumPermission } from './permissions';


export const routeGuard = (permission :EnumPermission): boolean => {

    const user = AuthState.currentState;
    // if it is not here, return true
    if (!permission) return true;

    const isAllowed = user?.payload?.permissions.includes(permission);
    if (isAllowed) return true;

    goto(routeLink(Config.Basic.appRoot), {replaceState: true});
   
}