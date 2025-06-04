<script lang="ts">
  import type { IDialogData } from "$lib/dialog/service.svelte";
  import type { IDmartRecord } from "$src/services/record.model";
  import { getContext } from "svelte";
  const props: IDialogData<{
    record: IDmartRecord;
    onsomething?: (ishee: string) => void;
  }> = $props();

  _attn($state.snapshot(props));
  const f = getContext("something"); // ishee here
  _attn(f, "passed context");
</script>

<button class="btn-fake" onclick={() => props.doClose(props.data)}
  >Close me</button
>
<button class="btn-rev" onclick={() => props.data.onsomething("hello ishee")}
  >Call ishee</button
>
