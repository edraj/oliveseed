<script lang="ts">
	import { Checkbox, Label, useId, type WithoutChildrenOrChild } from "bits-ui";

	let {
		id = useId(),
		checked = $bindable(false),
		ref = $bindable(null),
		labelRef = $bindable(null),
    labelText = "",
		...restProps
	}: WithoutChildrenOrChild<Checkbox.RootProps> & {
		labelText: string;
		labelRef?: HTMLLabelElement | null;
	} = $props();
</script>

<Checkbox.Root bind:checked bind:ref {...restProps} id={id}>
	{#snippet children({ checked, indeterminate })}
		{#if indeterminate}
			-
		{:else if checked}
			✅
		{:else}
			❌
		{/if}
	{/snippet}
</Checkbox.Root>
<Label.Root for={id} bind:ref={labelRef}>
	{labelText}
</Label.Root>
