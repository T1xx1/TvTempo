<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet<[]>;
	} = $props();
</script>

<div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-12 gap-1">
	{@render children()}
</div>
