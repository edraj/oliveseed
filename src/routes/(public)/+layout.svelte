<script lang="ts">
  import Language from "$src/shared/Language.svelte";
  import { routeLink } from "$utils/route";

  _seqlog("public layout loaded");

  let { children, data } = $props();
  const pages = data.pages;
</script>

<header class="container">
  <nav>
    <ul class="row boxed">
      <li>
        <a href={routeLink("/")}>Home</a>
      </li>
      {#each pages as item}
        <li>
          <a href={routeLink(`/pages/${item.shortname}`)}>
            {item.displayname}
          </a>
        </li>
      {/each}
      <li class="lauto">
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
