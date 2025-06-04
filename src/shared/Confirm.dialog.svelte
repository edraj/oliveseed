<script lang="ts">
  import type { IDialogData } from "$lib/dialog/service.svelte";

  const props: IDialogData<{ message: string }> = $props();
</script>

<div class="space">
  {@html props.data.message}
  <div class="txt-r breath">
    <button class="btn-fake" onclick={() => props.doClose(false)}>Nope</button>
    <button class="btn-rev" onclick={() => props.doClose(true)}>OK</button>
  </div>
</div>
