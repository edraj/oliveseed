<script lang="ts">
  import { Config } from "$src/config";
  import { routeLink } from "$utils/route";
</script>

<div class="spaced">

  <p>Have an account?</p>
  <a class="btn-rev" href={routeLink(Config.Auth.loginRoute)}>Login</a>
</div>

