<script lang="ts">
	import { Search, Tv } from '@lucide/svelte';
	import { Avatar, Button } from '@tvtempo/ui';
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet<[]>;
	} = $props();
</script>

{@render children()}

<nav
	class="fixed bottom-0 z-50 bg-[#1c1c1c] border-t border-[#393939] py-1.5 w-full flex items-center justify-around"
>
	<Button href="/dashboard" variant="ghost" size="icon-lg" class="cursor-pointer">
		<Tv class="size-6.5" />
	</Button>

	<Button href="/discover" variant="ghost" size="icon-lg" class="cursor-pointer">
		<Search class="size-6.5" />
	</Button>

	<a href="/profile">
		<Avatar.Root>
			<Avatar.Fallback>T</Avatar.Fallback>
		</Avatar.Root>
	</a>
</nav>
