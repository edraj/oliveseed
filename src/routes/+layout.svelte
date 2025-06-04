<script lang="ts">
  import Loader from "$lib/Loader.svelte";
  import { AuthState } from "$src/auth/auth.state";
  import "../app.css";

  _seqlog("Root layout loaded");
  let { children, data } = $props();
  AuthState.SetState(data?.authUser);
</script>

<Loader />
{@render children()}
