<script lang="ts">
  import { ValidateForm } from "$lib/input/form";
  import OlInput from "$lib/input/OlInput.svelte";
  import { Toast } from "$lib/toast/toast.svelte";
  import type { IDmartRecord } from "$src/services/record.model";
  import { toISODateString } from "$utils/common";
  import type { IViewMode } from "$utils/view.model";

  interface IPageProps {
    mode?: IViewMode;
    record?: IDmartRecord;
    onsave?: (record: IDmartRecord) => void;
    oncancel?: () => void;
  }

  let {
    mode = { forNew: true },
    record,
    onsave,
    oncancel,
  }: IPageProps = $props();

  let formState = $state({
    displayname: null,
    description: null,
    date: toISODateString(new Date()),
  });

  // if edit update
  if (record) {
    formState = {
      ...record, // structured clone
      displayname: record.displayname,
      description: record.description,
      date: toISODateString(record.date),
    };
  }
  const saveForm = (e: Event) => {
    e.preventDefault();
    Toast.Hide();

    if (!ValidateForm(e.target as HTMLFormElement)) {
      return;
    }
    onsave({
      ...record,
      ...formState,
      date: new Date(formState.date),
    });
  };

  const cancel = () => {
    oncancel();
  };
</script>

<form onsubmit={saveForm} novalidate>
  <div class="spaced">
    <OlInput placeholder="Title" forLabel="title" error="required">
      {#snippet input({ placeholder, css })}
        <input
          class="w100 {css}"
          type="text"
          bind:value={formState.displayname}
          {placeholder}
          required
          id="title"
        />
      {/snippet}
    </OlInput>
  </div>

  <div class="spaced">
    <OlInput placeholder="Date" forLabel="date" error="required">
      {#snippet input({ placeholder, css })}
        <input
          class="w100 {css}"
          type="date"
          bind:value={formState.date}
          {placeholder}
          required
          id="date"
        />
      {/snippet}
    </OlInput>
  </div>

  <div class="spaced">
    <OlInput placeholder="Description" forLabel="desc" error="required">
      {#snippet input({ placeholder, css })}
        <textarea
          class="w100 {css}"
          id="desc"
          rows="3"
          required
          bind:value={formState.description}
          {placeholder}
        ></textarea>
      {/snippet}
    </OlInput>
  </div>

  <div class="txt-r">
    <button type="button" class="btn-fake" onclick={cancel}>Cancel</button>
    <button type="submit" class="btn-rev">Save</button>
  </div>
</form>
