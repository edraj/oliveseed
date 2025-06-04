<script lang="ts">
  import { page } from "$app/state";
  import { Config } from "$src/config";
  import { Res } from "$utils/resources";

  // language switch
  const languages = Config.Res.languages;
  // keep path
  const _path = $derived(page.url.pathname.replace(Res.Re, ""));
</script>

{#each languages as lang}
  <span class="rspace">
    <a href={`/${lang.name}${_path}`} rel="external">
      {lang.display}
    </a>
  </span>
{/each}
