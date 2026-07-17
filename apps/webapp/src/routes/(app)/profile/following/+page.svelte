<script lang="ts">
	import { ArrowLeft, UserRound } from '@lucide/svelte';
	import { Avatar, Button, Empty } from '@tvtempo/ui';

	import Topbar from '~/components/Topbar.svelte';

	import { getFollowing } from '../page.remote';

	const follows = await getFollowing();
</script>

<div>
	<Topbar>
		{follows.length} follows
	</Topbar>

	<div class="pt-13 px-1.5 space-y-1">
		{#each follows as follow (follow.user.ids.trakt)}
			<div class="flex gap-2 items-center">
				<Avatar.Root size="lg">
					<Avatar.Image src={follow.user.images.avatar.full} />
					<Avatar.Fallback>{follow.user.username[0]}</Avatar.Fallback>
				</Avatar.Root>

				<span>{follow.user.name}</span>
			</div>
		{:else}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<UserRound />
					</Empty.Media>

					<Empty.Title>No follows</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{/each}
	</div>
</div>
