<script lang="ts">
  import type { IDialogData } from '$lib/dialog/service.svelte';
  import { Res } from '$src/utils/resources';
  // TODO: add actions
  const props: IDialogData<{ message: string; actions?: any[] }> = $props();
  const defaultActions = [
    {
      label: Res.Get('NO', 'No'),
      class: 'btn-fake',
      onclick: () => props.doClose(false),
    },
    {
      label: Res.Get('OK', 'Ok'),
      class: 'btn-dev',
      onclick: () => props.doClose(true),
    },
  ];

  const _actions = props.data.actions || defaultActions;
</script>

<div>
  <div class="spaced">
    {@html props.data.message}
  </div>
  {#if _actions.length}
    <div class="txt-r">
      {#each _actions as action}
        <button class={action.class} onclick={action.onclick}>{action.label}</button>
      {/each}
    </div>
  {/if}
</div>
