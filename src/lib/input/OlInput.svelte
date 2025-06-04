<script lang="ts">
  const {
    placeholder,
    error,
    invalidForm,
    forLabel,
    type,
    input,
    help,
  }: any = $props();

  const cssType = type ? `ol-${type}` : "";

  const errorText = $state(error);

</script>

<div class="ol-field {cssType}">
  <label class="ol-label" for={forLabel}>{placeholder}</label>
  {@render input({ placeholder, css: "ol-input" })}
  <span class="ol-required"></span>
  <span class="ol-feedback">{errorText}</span>
  <span class="ol-help">
    {@render help?.()}
  </span>
</div>

<style>
</style>
