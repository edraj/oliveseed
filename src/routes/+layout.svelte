<script lang="ts">
  import Loader from "$lib/loader/Loader.svelte";
  import { AuthState } from "$src/auth/auth.state";
  import "../app.css";

  let { children, data } = $props();
  AuthState.SetState(data?.authUser);
</script>

<Loader />
{@render children()}
