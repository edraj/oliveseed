// this is the highest place the login page can access, before page.ts

import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { AuthState } from "$src/auth/auth.state";
import { Config } from "$src/config";
import { routeLink } from "$utils/route";

export const load = async (_) => {
  //  a login guard is a function that redirects to dashboard if user exists
  if (browser) {
    if (AuthState.currentState) {
      goto(routeLink(Config.Basic.defaultRoute));
    }
  }
  return {};
};
