<script lang="ts">
  import { displayDate } from "$lib/transform/date";
  import { AuthState } from "$src/auth/auth.state";
  import { EnumRole } from "$src/auth/profile.model";
  import type { IDmartRecord } from "$src/services/record.model";
  import { routeLink } from "$utils/route";

  const user = AuthState.GetUser();

  interface IPageProps {
    record: IDmartRecord;
    onDelete?: (record: IDmartRecord) => void;
    onEdit?: (record: IDmartRecord) => void;
  }
  const { record, onDelete, onEdit }: IPageProps = $props();
</script>

<div class="card box">
  <div>
    <a class="weight-bold" href={routeLink(`/app/records/${record.shortname}`)}
      >{record.displayname}</a
    >
    <div class="light small">{displayDate(record.date)}</div>
    <p>
      {record.description}
    </p>
  </div>

  <div class="tail">
    {#if user.role === EnumRole.ADMIN}
      <button onclick={() => onDelete(record)} class="btn-fake">Delete</button>
      <button onclick={() => onEdit(record)} class="btn-fake">Edit</button>
    {/if}
  </div>
</div>
