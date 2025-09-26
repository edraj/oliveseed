<script lang="ts">
  interface IPageProps {
    data?: any[];
    dataItem?: any;
    label?: string;
  }
  let { data = $bindable([]), dataItem, label = '' }: IPageProps = $props();
</script>

{#each data as item, i}
  <div class="spaced row-spaced">
    {@render dataItem({ item, i })}

    <div class="col c-1 ml-auto">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button type="button" class="ms-auto btn-fake" onclick={() => data.splice(i, 1)}>
        <i class="icon-minus large"></i>
      </button>

    </div>
  </div>
  {/each}
  <div class="row-spaced">
    <button type="button" class="btn w-100" onclick={() => data.push({})}><i>add</i> {label}</button>
    <div class="col c-1">
    </div>
  </div>


