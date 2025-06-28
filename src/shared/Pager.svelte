<script lang="ts">
  import { Loader } from '$src/lib/loader/loader.state';
  import { translate } from '$src/utils/resources';
  import { filter, map } from 'rxjs';

  let {
    isLoadMore,
    source,
    onPage,
  }: { isLoadMore: boolean; source?: string; onPage: (event: MouseEvent, source?: string) => void } = $props();

  const loading = Loader.stateItem$.pipe(
    filter((state) => state.context === source),
    map((state) => state?.show || false),
  );

  const page = (event: MouseEvent): void => {
    // pass back the source
    onPage(event, source);
  };
</script>

<div class="pager {$loading ? 'loading' : ''}">
  {#if isLoadMore}
    <button class="morelink" title={translate('More', 'MORE')} onclick={(e) => page(e)}
      >{translate('More', 'MORE')}</button>
  {/if}
</div>

<style>
  .pager {
    text-align: center;
    margin-top: var(--my-doublespace);
    margin-bottom: var(--my-doublespace);
    /* .morelink {
      transform: rotate(90deg);
    } */
    &.loading .morelink {
      /* TODO: change icon */
      animation-name: paging;
      animation-duration: 0.2s;
      animation-timing-function: ease-in-out;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }

  @keyframes paging {
    0% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
