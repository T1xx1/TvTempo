<script lang="ts">
	import { ArrowLeft, UserRound } from '@lucide/svelte';
	import { Avatar, Button, Empty } from '@tvtempo/ui';

	import { getFollowers } from '../page.remote';

	const followers = await getFollowers();
</script>

<div>
	<div
		class="fixed top-0 z-50 bg-blackish border-b border-greyish rounded-b-md py-1 w-full flex gap-1 items-center"
	>
		<Button href="/profile" variant="ghost">
			<ArrowLeft />
		</Button>

		<span>{followers.length} followers</span>
	</div>

	<div class="pt-13 px-1.5 space-y-1">
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
