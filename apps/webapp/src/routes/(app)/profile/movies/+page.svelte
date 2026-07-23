<script lang="ts">
	import { Clapperboard, Eraser, Heart, Search, X } from '@lucide/svelte';
	import { Button, Empty, InputGroup, Toggle } from '@tvtempo/ui';

	import Grid from '~/components/Grid.svelte';
	import Media from '~/components/Media.svelte';
	import Topbar from '~/components/Topbar.svelte';

	import { getFavouriteMovies, getWatchedMovies } from './page.remote';

	const { data } = $props();

	const movies = await getWatchedMovies();
	const favouriteMovies = await getFavouriteMovies();

	let search = $state('');
	// svelte-ignore state_referenced_locally
	let isFavourite = $state(data.isFavourite);

	const filteredMovies = $derived.by(() => {
		const set = isFavourite ? favouriteMovies : movies;

		return set.filter((movie) => {
			return movie.movie.title.toLowerCase().includes(search.toLowerCase());
		});
	});
	const clear = () => {
		search = '';
		isFavourite = false;
	};
</script>

<div class="space-y-2">
	<Topbar>
		{filteredMovies.length} movies
	</Topbar>

	<div class="z-10 fixed top-11 bg-background p-1.5 pt-2 w-full flex flex-col gap-1">
		<InputGroup.Root>
			<InputGroup.Input bind:value={search} placeholder="Search movies by title..." />
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
		{#if movies.length === 0}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Clapperboard />
					</Empty.Media>

					<Empty.Title>No movies</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{:else if filteredMovies.length === 0}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Search />
					</Empty.Media>

					<Empty.Title>No movies found</Empty.Title>
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
				{#each filteredMovies as movie (movie.movie.ids.trakt)}
					{const isFavourite = favouriteMovies.some(favouriteMovie => {
						return favouriteMovie.movie.ids.trakt === movie.movie.ids.trakt;
					})}

					<Media
						type="movie"
						slug={movie.movie.ids.slug}
						imgSrc={`https://${movie.movie.images.poster[0]}`}
						alt={movie.movie.title}
						{isFavourite}
					/>
				{/each}
			</Grid>
		{/if}
	</div>
</div>
