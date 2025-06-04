<script lang="ts">
  import { Toast } from "$lib/toast/toast.svelte";
  import { AuthState } from "$src/auth/auth.state";
  const user = AuthState.GetUser();

  const tryme = () => {
    Toast.Show("INVALID_FORMAT");
  };
</script>

The dashboard {user.displayname}
{user.role}
<div>
  <button class="btn" onclick={() => tryme()}>Try me</button>
</div>
