<script lang="ts">
  import { Dialog, type IDialog } from "$lib/dialog/service.svelte";
  import { AuthState } from "$src/auth/auth.state";
  import type { IDmartRecord } from "$src/services/record.model";
  import { getAllContexts, setContext } from "svelte";
  import TestDialog from "./testdialog.svelte";
  const user = AuthState.GetUser();

  setContext("something", "ishee here");
  const context = getAllContexts(); // the only way to pass context

  const handleDialog = () => {
    const s = {
      shortname: null, // must exist
      displayname: "",
      date: new Date(),
      description: null,
    };
    // when added do semethong
    const ref = Dialog.open(TestDialog, {
      title: "here is the title",
      css: "",
      data: {
        record: s,
        onsomething: (ishee: string) => {
          _attn(ishee);
        },
      },
      context, // if you want to pass context to opened dialog
      onclose: (d) => {
        _attn(d);
      },
      // add "as" for strict typing, but it's optional
    } as IDialog<{
      record: IDmartRecord;
      onsomething?: (ishee: string) => void;
    }>);
  };
</script>

<div class="spaced">
  User profile and allow user to edit profile
  {user.displayname}
</div>

<div class="spaced box box-white">
  <button class="btn-rev" onclick={handleDialog}> Open record in dialog</button>
</div>
