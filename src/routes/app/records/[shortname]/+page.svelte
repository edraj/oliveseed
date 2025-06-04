<script lang="ts">
  import { page } from "$app/state";
  import { rootRecordList } from "$src/services/record.state.svelte";
  import { map } from "rxjs";

  // this might be a direct api call
  const record = rootRecordList.stateList$.pipe(
    map((f) => f.find((n) => n.shortname === page.params.shortname)),
  );
</script>

{#if $record}
  <h4>{$record.displayname}</h4>
{/if}
