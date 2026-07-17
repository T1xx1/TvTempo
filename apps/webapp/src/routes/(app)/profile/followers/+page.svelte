<script lang="ts">
	import { UserRound } from '@lucide/svelte';
	import { Avatar, Empty } from '@tvtempo/ui';

	import Topbar from '~/components/Topbar.svelte';

	import { getFollowers } from './page.remote';

	const followers = await getFollowers();
</script>

<div>
	<Topbar>
		{followers.length} followers
	</Topbar>

	<div class="p-1.5 pt-13 space-y-1">
		{#each followers as follower (follower.user.ids.trakt)}
			<div class="flex gap-2 items-center">
				<Avatar.Root size="lg">
					<Avatar.Image src={follower.user.images.avatar.full} />
					<Avatar.Fallback>{(follower.user.name ?? follower.user.username)[0]}</Avatar.Fallback>
				</Avatar.Root>

				<span>{follower.user.name ?? follower.user.username}</span>
			</div>
		{:else}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<UserRound />
					</Empty.Media>

					<Empty.Title>No followers</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{/each}
	</div>
</div>
