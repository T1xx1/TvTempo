<script lang="ts">
	import { Clapperboard, X } from '@lucide/svelte';
	import { Empty, InputGroup } from '@tvtempo/ui';

	import Grid from '~/components/Grid.svelte';
	import Media from '~/components/Media.svelte';
	import Topbar from '~/components/Topbar.svelte';

	import { getWatchedMovies } from './page.remote';

	const movies = await getWatchedMovies();

	let search = $state('');

	const watchedMovies = $derived(
		movies.filter((movie) => {
			return movie.movie.title.toLowerCase().includes(search.toLowerCase());
		}),
	);
</script>

<div class="space-y-2">
	<Topbar>
		{movies.length} movies
	</Topbar>

	<div class="p-1.5 pt-13">
		<InputGroup.Root>
			<InputGroup.Input bind:value={search} placeholder="Search movies by title..." />
			<InputGroup.Button
				onclick={() => {
					search = '';
				}}
			>
				<X />
			</InputGroup.Button>
		</InputGroup.Root>
	</div>

	<div class="px-1">
		{#if movies.length === 0}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Clapperboard />
					</Empty.Media>

					<Empty.Title>No movies</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{:else if watchedMovies.length === 0}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Clapperboard />
					</Empty.Media>

					<Empty.Title>No movies found</Empty.Title>
				</Empty.Header>
			</Empty.Root>
		{:else}
			<Grid>
				{#each watchedMovies as movie (movie.movie.ids.trakt)}
					<Media
						type="movie"
						slug={movie.movie.ids.slug}
						imgSrc={`https://${movie.movie.images.poster[0]}`}
						alt={movie.movie.title}
					/>
				{/each}
			</Grid>
		{/if}
	</div>
</div>

<pre></pre>
