<script lang="ts">
	import { Eraser, Heart, Search, Tv, X } from '@lucide/svelte';
	import { Button, Empty, InputGroup, Toggle } from '@tvtempo/ui';

	import Grid from '~/components/Grid.svelte';
	import Media from '~/components/Media.svelte';
	import Topbar from '~/components/Topbar.svelte';

	import { getFavouriteShows, getWatchedShows } from './page.remote';

	const { data } = $props();

	const shows = await getWatchedShows();
	const favouriteShows = await getFavouriteShows();

	let search = $state('');
	// svelte-ignore state_referenced_locally
	let isFavourite = $state(data.isFavourite);

	const filteredShows = $derived.by(() => {
		const set = isFavourite ? favouriteShows : shows;

		return set.filter((show) => {
			return show.show.title.toLowerCase().includes(search.toLowerCase());
		});
	});
	const clear = () => {
		search = '';
		isFavourite = false;
	};
</script>

<div class="space-y-2">
	<Topbar>
		{filteredShows.length} shows
	</Topbar>

	<div class="z-10 fixed top-11 bg-background p-1.5 pt-2 w-full flex flex-col gap-1">
		<InputGroup.Root>
			<InputGroup.Input bind:value={search} placeholder="Search shows by title..." />
			<InputGroup.Button
				class="cursor-pointer"
				onclick={() => {
					search = '';
				}}
			>
				<X class="stroke-red-500" />
			</InputGroup.Button>
		</InputGroup.Root>

		<div>
			<Toggle
				variant="outline"
				size="sm"
				class="cursor-pointer"
				pressed={isFavourite}
				onclick={() => {
					isFavourite = !isFavourite;
				}}
			>
				<Heart class={isFavourite ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
				<span>Favourite</span>
			</Toggle>
		</div>
	</div>

	<div class="px-1 pt-33">
		{#if shows.length === 0}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Tv />
					</Empty.Media>

					<Empty.Title>No shows</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{:else if filteredShows.length === 0}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Search />
					</Empty.Media>

					<Empty.Title>No shows found</Empty.Title>
				</Empty.Header>

				<Empty.Content>
					<Button
						variant="outline"
						size="sm"
						class="cursor-pointer"
						onclick={clear}
					>
						<Eraser />
						<span>Clear filters</span>
					</Button>
				</Empty.Content>
			</Empty.Root>
		{:else}
			<Grid>
				{#each filteredShows as show (show.show.ids.trakt)}
					{const isFavourite = favouriteShows.some(favouriteShow => {
						return favouriteShow.show.ids.trakt === show.show.ids.trakt;
					})}

					<Media
						type="movie"
						slug={show.show.ids.slug}
						imgSrc={show.show.images?.poster[0] ? `https://${show.show.images?.poster[0]}` : ''}
						alt={show.show.title}
						{isFavourite}
					/>
				{/each}
			</Grid>
		{/if}
	</div>
</div>

<pre></pre>
