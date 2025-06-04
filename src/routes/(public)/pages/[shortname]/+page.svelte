<script lang="ts">
  import { page } from "$app/state";
  let { data } = $props();
</script>

{#key page.url.pathname}
  <!-- {@const body = compile(data.page.body) } -->

  <main class="content-page">
    {#if data.page}
      <h3>{data.page.displayname}</h3>
      {data.page.body}
      <!-- {#await body then value}
        {@html value.code}
      {/await} -->
    {/if}
  </main>
{/key}

<style>
</style>
