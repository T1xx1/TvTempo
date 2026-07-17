<script lang="ts">
	import { UserRound } from '@lucide/svelte';
	import { Avatar, Empty } from '@tvtempo/ui';

	import Topbar from '~/components/Topbar.svelte';

	import { getFriends } from './page.remote';

	const friends = await getFriends();
</script>

<div>
	<Topbar>
		{friends.length} friends
	</Topbar>

	<div class="p-1.5 pt-13 space-y-1">
		{#each friends as friend (friend.user.ids.trakt)}
			<div class="flex gap-2 items-center">
				<Avatar.Root size="lg">
					<Avatar.Image src={friend.user.images.avatar.full} />
					<Avatar.Fallback>{friend.user.username[0]}</Avatar.Fallback>
				</Avatar.Root>

				<span>{friend.user.name}</span>
			</div>
		{:else}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<UserRound />
					</Empty.Media>

					<Empty.Title>No friends</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{/each}
	</div>
</div>
