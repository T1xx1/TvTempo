<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { Button } from '@tvtempo/ui';
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet<[]>;
	} = $props();
</script>

<div
	class="fixed top-0 z-50 bg-blackish border-b border-greyish rounded-b-md p-1 w-full flex gap-1 items-center"
>
	<Button href="/profile" variant="ghost">
		<ArrowLeft />
	</Button>

	<span>{@render children()}</span>
</div>
