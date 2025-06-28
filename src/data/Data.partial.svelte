<script lang="ts">
  import type { IData, TDataType } from '$src/data/data.model';
  import { DataService } from '$src/data/data.service';

  interface IProps {
    shortname: string;
    type: TDataType;
  }
  const { shortname, type }: IProps = $props();

  let data = $state<IData>(null);
  DataService.GetSingleDataByKey(type, shortname).then((d) => (data = d));
</script>

{#if data}
  {data.displayname}
{/if}
