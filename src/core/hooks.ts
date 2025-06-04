import { AuthState } from "$src/auth/auth.state";
import { Config } from "$src/config";
import { Res } from "$utils/resources";
import type { Reroute } from "@sveltejs/kit";

export const reroute: Reroute = ({ url }) => {
  // catch /en or /ke or /ar and write cookie of language
  if (url.pathname.indexOf(Config.Auth.loginRoute) < 0) {
    AuthState.redirectUrl = url.pathname;
  }
  return url.pathname.replace(Res.Re, "");
};
