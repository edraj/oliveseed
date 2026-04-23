<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { Loader } from '$src/lib/loader/loader.state';
  import { derived } from 'svelte/store';

  let show = derived(Loader.stateItem$, (state) => (state ? state.show : false));

  afterNavigate((navigation) => {
    Loader.emitUrl(navigation.to.url.pathname);
  });
  beforeNavigate((navigation) => {
    Loader.emitUrl(navigation.from.url.pathname);
  });
</script>

{#if $show}
  <div class="httploader">
    <div class="line"></div>
    <div class="subline inc"></div>
    <div class="subline dec"></div>
  </div>
{/if}

<style>

  .httploader {
    --sh-loader-height: 5px;
    height: var(--sh-loader-height);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5101;
    overflow: hidden;
    right: 0;
  }

  .line {
    position: absolute;
    opacity: 0.4;
    background: #927fe9;
    width: 100%;
    height: var(--sh-loader-height);
  }

  .subline {
    position: absolute;
    background: #4f08c9;
    height: var(--sh-loader-height);
  }
  .inc {
    animation: increase 5s infinite;
  }
  .dec {
    animation: decrease 5s 1s infinite;
  }

  @keyframes increase {
    from {
      left: -5%;
      width: 5%;
    }
    to {
      left: 130%;
      width: 100%;
    }
  }
  @keyframes decrease {
    from {
      left: -80%;
      width: 80%;
    }
    to {
      left: 110%;
      width: 10%;
    }
  }
</style>
