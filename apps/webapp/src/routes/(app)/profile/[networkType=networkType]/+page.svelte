<script lang="ts">
	import { UserRound } from '@lucide/svelte';
	import { Avatar, Empty } from '@tvtempo/ui';

	import Topbar from '~/components/Topbar.svelte';

	import { getNetwork } from './page.remote';

	const { data } = $props();
	const { networkType } = $derived(data);

	const network = $derived(await getNetwork(networkType));
</script>

<div>
	<Topbar>
		{network.length}
		{networkType}
	</Topbar>

	<div class="p-1.5 pt-13 space-y-1">
		{#each network as user (user.user.ids.trakt)}
			<div class="flex gap-2 items-center">
				<Avatar.Root size="lg">
					<Avatar.Image src={user.user.images.avatar.full} />
					<Avatar.Fallback>{(user.user.name ?? user.user.username)[0]}</Avatar.Fallback>
				</Avatar.Root>

				<span>{user.user.name ?? user.user.username}</span>
			</div>
		{:else}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<UserRound />
					</Empty.Media>

					<Empty.Title>No {networkType}</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{/each}
	</div>
</div>
