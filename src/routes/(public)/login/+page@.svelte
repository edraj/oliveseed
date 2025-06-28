<script lang="ts">
  import { goto } from "$app/navigation";
  import OlInput from "$lib/input/OlInput.svelte";
  import { Toast } from "$lib/toast/toast.state";
  import { AuthService } from "$src/auth/auth.service";
  import { AuthState } from "$src/auth/auth.state";
  import { Config } from "$src/config";
  import { routeLink } from "$utils/route";

  let username = $state("");
  let password = $state("");
  let showPassword = $state(false);

  async function handleLogin(event: Event) {
    Toast.Hide();

    // these following lines can be automated
    event.preventDefault();
    this.classList.add("was-validated");

    if (!this.checkValidity()) {
      return;
    }

    AuthService.Login(username, password)
      .then((_) => {
        goto(routeLink(AuthState.redirectUrl || Config.Basic.appRoot));
      });
  }
</script>

<div class="page md-6">
  <div class="container center-content h100" style="height: 100vh">
    <form onsubmit={handleLogin} novalidate>
      <div class="">
        <OlInput placeholder="Username" forLabel="username" error="required">
          {#snippet input({ placeholder, css })}
            <input
              class="w100 {css}"
              type="text"
              bind:value={username}
              {placeholder}
              required
              autocomplete="email"
              id="username"
            />
          {/snippet}
        </OlInput>
        <OlInput placeholder="Password" forLabel="password" error="required">
          {#snippet input({ placeholder, css })}
            <div class={showPassword ? "show" : ""}>
              <input
                class="w100 {css}"
                type={showPassword ? "text" : "password"}
                bind:value={password}
                {placeholder}
                required
                autocomplete="current-password"
                id="password"
              />
              <button
                type="button"
                class="btn-fake"
                onclick={() => (showPassword = !showPassword)}
                tabindex="-1">show</button
              >
            </div>
          {/snippet}
        </OlInput>

        <div>
          <button class="btn-rev" type="submit">Login</button>
        </div>
      </div>
    </form>
  </div>
</div>
