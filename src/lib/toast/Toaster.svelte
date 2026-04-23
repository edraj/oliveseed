<script lang="ts">
  import { Toast } from './toast.state';
  const toast = Toast.stateItem$;
</script>
<div class="toast {$toast.visible ? 'inview' : ''} {$toast.css} {$toast.extracss}">
  {#if $toast.icon}
    <div class="icon">
      <i class="symbol {$toast.icon}"></i>
    </div>
  {/if}
  <div class="text">
    <div class="primary">
      {$toast.text}
    </div>
    {#if $toast.secondary}
      <div class="secondary">{$toast.secondary}</div>
    {/if}
  </div>
  {#if $toast.buttons?.length}
    <div class="buttons">
      {#each $toast.buttons as button}
        <button class={button.css} onclick={button.click}>{button.text}</button>
      {/each}
    </div>
  {/if}
</div>

<!-- WATCH: Remove sh vars in new project -->
<style>
  .toast {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
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
    box-shadow: 0 0 7px -1px rgba(0, 0, 0, 0.5);
    &.error {
      background-color: var(--sh-red);
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
  /*
  .primary {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  } */
  .secondary {
    opacity: 0.7;
    font-weight: 300;
  }
  .icon {
    --ol-icon-padding: var(--sh-space);
    padding: var(--ol-icon-padding);
    padding-inline-end: 0;
  }
  .success {
    .icon {
      --ol-icon-padding: calc(var(--sh-space) - 5px);
    }
    i:before {
      background-color: var(--sh-green);
      padding: 5px;
      border-radius: 100%;
      line-height: 1;
    }
  }
  .warning {
    .icon {
      --ol-icon-padding: calc(var(--sh-space) - 5px);
    }
    i {
      color: var(--sh-text-color);
    }
    i:before {
      background-color: var(--sh-yellow);
      padding: 5px;
      border-radius: 100%;
      line-height: 1;
    }
  }

  .buttons {
    display: flex;

    button {
      padding: var(--sh-space);
      cursor: pointer;
      color: inherit;
      display: block;
    }
  }
  :global {
    .inadapt .toast {
      transition: none;
    }
  }
</style>
