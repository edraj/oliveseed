<script lang="ts">
  import { Loader } from '$src/lib/loader/loader.state';
  import { translate } from '$src/utils/resources';
  import { derived, readable } from 'svelte/store';

  let {
    isLoadMore,
    source,
    onPage,
  }: { isLoadMore: boolean; source?: string; onPage: (event: MouseEvent, source?: string) => void } = $props();


  const loading = $derived.by(() => {
    if (!source) {
      return readable(null);
    }
    return derived(Loader.stateItem$, (state) => {
      if (state.source !== source) return null;
      return state?.show || false;
    })
  })

  const page = (event: MouseEvent): void => {
    // pass back the source
    onPage(event, source);
  };
</script>

{#if isLoadMore}
  <div class="pager {$loading ? 'loading' : ''}">
    <button class="morelink btn-rev" title={translate('More', 'MORE')} onclick={(e) => page(e)}>
      <i class="symbol icon-chevrons-down"></i>
    </button>
  </div>
{/if}

<style>
  .pager {
    text-align: center;
    margin-top: var(--sh-doublespace);
    margin-bottom: var(--sh-doublespace);
  }
  .morelink {
    display: block;
    width: fit-content;
    margin-inline: auto;
    border-radius: 1000px;
    aspect-ratio: 1;
    .loading & {
      animation-name: paging;
      animation-duration: 0.2s;
      animation-timing-function: ease-in-out;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }

  @keyframes paging {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
