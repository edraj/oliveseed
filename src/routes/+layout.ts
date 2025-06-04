import { AuthState } from "$src/auth/auth.state";
import { PageService } from "$src/services/page.service";

export const ssr = false;

export async function load() {
  _seqlog("Root layout load");

  const pages = await PageService.GetPages();
  return {
    authUser: AuthState.currentState,
    pages,
  };
}
