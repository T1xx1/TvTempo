<script lang="ts">
	import { Search, Tv } from '@lucide/svelte';
	import { Avatar, Button } from '@tvtempo/ui';
	import type { Snippet } from 'svelte';

	import { getUser } from './page.remote';

	let {
		children,
	}: {
		children: Snippet<[]>;
	} = $props();

	const user = await getUser();
</script>

<div class="pb-26 min-h-full">
	{@render children()}
</div>

<nav
	class="fixed bottom-0 z-50 bg-blackish border-t border-greyish rounded-t-md py-1.5 w-full flex items-center justify-around"
>
	<Button href="/dashboard" variant="ghost" size="icon-lg" class="cursor-pointer">
		<Tv class="size-6.5" />
	</Button>

	<Button href="/discover" variant="ghost" size="icon-lg" class="cursor-pointer">
		<Search class="size-6.5" />
	</Button>

	<a href="/profile">
		<Avatar.Root>
			<Avatar.Image src={user.images.avatar.full} />
			<Avatar.Fallback>{user.username[0]}</Avatar.Fallback>
		</Avatar.Root>
	</a>
</nav>
