<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from '$app/state';
  import { AuthState } from "$src/auth/auth.state";
  import { routeGuard } from '$src/auth/guard.js';
  import { Config } from "$src/config";
  import { rootRecordList } from "$src/services/record.state.js";
  import Language from "$src/shared/Language.svelte";
  import { translate } from "$utils/resources";
  import { routeLink } from "$utils/route";
  import { AuthService } from '../../auth/auth.service.js';
  let { children, data } = $props();
  const user = AuthState.GetUser();

  rootRecordList.SetList(data.records);

  const logout = async (e) => {
    e.preventDefault();

    await AuthService.Logout();

    AuthState.Logout();

    goto(routeLink(Config.Auth.loginRoute));
  };

  $effect(() => {
    routeGuard(page.data?.permission);
  });
</script>

<header>
  <nav>
    <ul class="row boxed">
      <li>
        <a href={routeLink("/app/records")}>{translate("Records", "RECORDS")}</a
        > |
      </li>
      <li>
        <a href={routeLink("/app/account")}>Account</a> |
      </li>
      <li class="lauto">
        {user.displayname}
        <button onclick={logout} class="btn-fake">Logout</button>
      </li>
      <li>
        <Language></Language>
      </li>
    </ul>
  </nav>
</header>

<div class="page">
  <div class="container">
    {@render children()}
  </div>
</div>
