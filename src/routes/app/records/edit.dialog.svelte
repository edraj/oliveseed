<script lang="ts">
  import type { IDialogData } from "$lib/dialog/service.svelte";
  import type { IDmartRecord } from "$src/services/record.model";
  import RecordForm from "./form.svelte";

  const props: IDialogData<IDmartRecord> = $props();
</script>

<RecordForm
  mode={{ forNew: false }}
  record={props.data}
  onsave={(r) => props.doClose(r)}
  oncancel={() => props.doClose(null)}
></RecordForm>
