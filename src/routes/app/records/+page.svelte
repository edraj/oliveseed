<script lang="ts">
  import { Dialog } from "$lib/dialog/service.svelte";
  import { Toast } from "$lib/toast/toast.svelte";
  import { AuthState } from "$src/auth/auth.state";
  import { EnumRole } from "$src/auth/profile.model";
  import type { IDmartRecord } from "$src/services/record.model";
  import { RecordService } from "$src/services/record.service";
  import { rootRecordList } from "$src/services/record.state.svelte";
  import ConfirmDialog from "$src/shared/Confirm.dialog.svelte";
  import { generateShortName } from "$utils/common";
  import { type Observable } from "rxjs";
  import RecordAddDialog from "./add.dialog.svelte";
  import RecordCard from "./card.svelte";
  import RecordEditDialog from "./edit.dialog.svelte";

  const user = AuthState.GetUser();

  const records: Observable<IDmartRecord[]> = rootRecordList.stateList$;

  const handleAdd = () => {
    // when added do semethong
    Dialog.open(RecordAddDialog, {
      title: "Add a new record",
      css: "modal-half-screen animate fromend",
      onclose: async (record: IDmartRecord) => {
        if (!record) return;
        const _newRecord: IDmartRecord = {
          ...record,
          shortname: generateShortName(record.displayname),
          color: "black",
        };

        await RecordService.CreateRecord(_newRecord);
        rootRecordList.add(<IDmartRecord>_newRecord);
        Toast.ShowSuccess("DONE");
      },
    });
  };
  const handleEdit = (record) => {
    // when added do semethong
    Dialog.open(RecordEditDialog, {
      title: "Edit record",
      css: "modal-half-screen animate fromend",
      data: record,
      onclose: async (record: IDmartRecord) => {
        if (!record) return;
        await RecordService.UpdateRecord(record);
        rootRecordList.edit(record);
        Toast.ShowSuccess("DONE");
      },
    });
  };

  const handleDelete = (record) => {
    // when added do semethong
    Dialog.open(ConfirmDialog, {
      title: "Deleting record",
      css: "modal-confirm",
      data: {
        message: `
        <h3>${record.displayname}</h3>
        Are you sure you want to delete this record?
        This action cannot be undone.`,
      },
      onclose: async (confirmed) => {
        if (confirmed) {
          await RecordService.DeleteRecord(record);
          rootRecordList.remove(record);
          Toast.ShowSuccess("DONE");
        }
      },
    });
  };
</script>

{#if user.role === EnumRole.ADMIN}
  <div class="box box-white-normal txt-r">
    <button class="btn-rev" onclick={handleAdd}> Add Record </button>
  </div>
{/if}
<div class="spaced">
  {#if $records.length > 0}
    <ul class="rowlist">
      {#each $records as record}
        <li>
          <RecordCard {record} onDelete={handleDelete} onEdit={handleEdit}
          ></RecordCard>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No records found.</p>
  {/if}
</div>
