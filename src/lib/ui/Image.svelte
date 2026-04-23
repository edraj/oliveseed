<script lang="ts">
  import { lazy } from '$src/lib/attach/lazy';

  const { url, title, isLazy = true, ...rest } = $props();
  let src = $derived(isLazy ? '/images/uempty.png' : url);
</script>


{#if url}
  <img
    {@attach isLazy && lazy(url)}
    fetchpriority={isLazy ? 'auto' : 'high'}
    {src}
    alt={title}
    class:loading={isLazy}
    decoding={isLazy ? 'async' : 'auto'}
    {...rest} />
{/if}

<style>
  :global {
    img.loading {
      mix-blend-mode: color-burn;
      filter: blur(10px);
    }
  }
</style>
