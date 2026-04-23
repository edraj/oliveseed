<script lang="ts">
  import { Loader } from '$src/lib/loader/loader.state';
  import { derived, readable } from 'svelte/store';

  // inpage loading indicater
  let { source }: { source?: string } = $props();

  const loading = $derived.by(() => {
    if (!source) {
      return readable(null);
    }
    return derived(Loader.stateItem$, (state) => {
      if (state.source !== source) return null;
      return state?.show || false;
    });
  });
</script>

<div class="loading-indicator {$loading ? 'loading' : ''}">
  <i class="icon-more-vertical symbol"></i>
</div>

<style>
  .loading-indicator {
    /* hide */
    display: none;
    &.loading {
      display: flex;
      position: absolute;
      z-index: 1000;
      width: 100%;
      height: 100%;
      padding-block: 50px;
      backdrop-filter: blur(3px);
      justify-content: center;
      align-items: center;
    }
    i {
      animation-name: indicator;
      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      display: block;
      font-size: 250%;
      color: var(--color-black);
    }
  }

  @keyframes indicator {
    0% {
      transform: rotate(45deg);
    }

    100% {
      transform: rotate(-45deg);
    }
  }

  :global :has(> .loading-indicator) {
    position: relative;
  }
</style>
