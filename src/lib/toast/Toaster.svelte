<script lang="ts">
  import { Toast } from "./toast.svelte";
  const toast = Toast.stateItem$;
</script>

<div class="{$toast.visible ? 'inview' : ''} {$toast.css} {$toast.extracss}">
  <div class="text">{$toast.text}</div>
  {#if $toast.buttons?.length}
    <div class="buttons">
      {#each $toast.buttons as button}
        <button class={button.css} onclick={button.click}>{button.text}</button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .toast {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: var(--sh-grey-dark);
    color: var(--sh-white);
    position: fixed;
    inset-block-end: var(--sh-space);
    inset-inline: var(--sh-space);
    max-width: 500px;
    margin-inline: auto;
    font-size: 90%;
    z-index: 5100;
    border-radius: var(--sh-radius);

    &.error {
      background-color: var(--sh-red);
    }

    &.success {
      background-color: var(--sh-green);
    }

    &.warning {
      background-color: var(--sh-yellow);
      color: var(--sh-textcolor);
    }

    transform: translateY(calc(100% + var(--sh-space)));
    transition: transform 0.2s ease-in-out;

    &.inview {
      transform: translateY(0);
    }
  }

  .text {
    padding: var(--sh-space);
    margin-right: var(--sh-halfspace);
    flex-basis: 100%;
  }

  .buttons {
    display: flex;

    button {
      text-transform: uppercase;
      padding: var(--sh-space);
      cursor: pointer;
      color: inherit;
      display: block;
    }
  }
</style>
