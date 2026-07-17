<script lang="ts">
	import { Bookmark, Clapperboard, Popcorn, Sparkles, Tv } from '@lucide/svelte';
	import { Badge, Button, Tabs } from '@tvtempo/ui';

	import Grid from '~/components/Grid.svelte';
	import Media from '~/components/Media.svelte';

	import { getWatchingShows, getWatchlist } from './page.remote';

	// const watchingShows = await getWatchingShows();

	const watchlist = await getWatchlist();

	const watchingShows = [
		{
			show: {
				ids: {
					slug: 'gravity-falls',
				},
				title: 'Gravity falls',
				images: {
					poster: ['media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp'],
				},
			},
		},
	];
</script>

<Tabs.Root value="shows">
	<Tabs.List class="fixed top-0 z-50 border border-greyish rounded-t-none w-full lg:w-3/5">
		<Tabs.Trigger value="shows" class="cursor-pointer">
			<Tv />
			<span>Shows</span>
		</Tabs.Trigger>

		<Tabs.Trigger value="movies" class="cursor-pointer">
			<Clapperboard />
			<span>Movies</span>
		</Tabs.Trigger>
	</Tabs.List>

	<div class="p-1.5 pt-11">
		<Tabs.Content value="shows" class="space-y-4">
			<div class="flex flex-col gap-y-2 items-center justify-center">
				<Badge variant="outline" class="bg-input px-2">
					<Popcorn />
					<span>Watching</span>
				</Badge>

				<Grid>
					{#each watchingShows as show}
						<Media
							type="show"
							slug={show.show.ids.slug}
							imgSrc={`https://${show.show.images.poster[0]}`}
							alt={show.show.title}
						/>
					{/each}
				</Grid>
			</div>

			<div class="flex flex-col gap-y-2 items-center justify-center">
				<Badge variant="outline" class="bg-input px-2">
					<Bookmark />
					<span>Watchlist</span>
				</Badge>

				<Grid>
					{const watchlistShows = watchlist.filter(media => {
						return media.type === 'show';
					})}

					{#each watchlistShows as show}
						<Media
							type="show"
							slug={show.show.ids.slug}
							imgSrc={`https://${show.show.images.poster[0]}`}
							alt={show.show.title}
						/>
					{/each}
				</Grid>
			</div>

			<div class="mt-10 flex items-center justify-center">
				<Button
					href="/discover"
					variant="outline"
					size="sm"
					class="rounded-full px-4 cursor-pointer"
				>
					<Sparkles />
					<span>Browse shows</span>
				</Button>
			</div>
		</Tabs.Content>

		<Tabs.Content value="movies">
			<div class="flex flex-col gap-y-1.5 items-center justify-center">
				<Badge variant="outline" class="bg-input px-2">
					<Bookmark />
					<span>Watchlist</span>
				</Badge>

				<Grid>
					{const watchlistMovies = watchlist.filter(media => {
						return media.type === 'movie';
					})}

					{#each watchlistMovies as movie}
						<Media
							type="movie"
							slug={movie.movie.ids.slug}
							imgSrc={`https://${movie.movie.images.poster[0]}`}
							alt={movie.movie.title}
						/>
					{/each}
				</Grid>
			</div>

			<div class="mt-10 flex items-center justify-center">
				<Button
					href="/discover"
					variant="outline"
					size="sm"
					class="rounded-full px-4 cursor-pointer"
				>
					<Sparkles />
					<span>Browse movies</span>
				</Button>
			</div>
		</Tabs.Content>
	</div>
</Tabs.Root>
