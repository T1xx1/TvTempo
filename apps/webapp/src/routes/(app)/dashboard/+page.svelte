<script lang="ts">
	import { Clapperboard, Tv } from '@lucide/svelte';
	import { Badge, Button, Tabs } from '@tvtempo/ui';

	import Media from '~/components/Media.svelte';

	import { getWatching, getWatchlist } from './page.remote';

	const watching = await getWatching();
	const watchlist = await getWatchlist()
</script>

<Tabs.Root value="shows">
	<Tabs.List class="fixed top-0 z-50 rounded-t-none w-full">
		<Tabs.Trigger value="shows" class="cursor-pointer">
			<Tv />
			<span>Shows</span>
		</Tabs.Trigger>

		<Tabs.Trigger value="movies" class="cursor-pointer">
			<Clapperboard />
			<span>Movies</span>
		</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="shows" class="pt-10 px-1 space-y-4">
		<div class="flex flex-col gap-y-1.5 items-center justify-center">
			<Badge variant="outline" class="bg-input px-2">Watchlist</Badge>

			<div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-12 gap-1">
				{const movies = watchlist.filter(media => {
					return media.type === 'show';
				})}

				{#each movies as show}
					<Media type="show" slug={show.show.ids.slug} imgSrc={`https://${show.show.images.poster[0]}`} alt={show.show.title} />	
				{/each}
			</div>
		</div>

		<div class="mt-8 flex items-center justify-center">
			<Button href="/discover" variant="outline" size="sm" class="rounded-full px-4 cursor-pointer">Browse shows</Button>
		</div>
	</Tabs.Content>

	<Tabs.Content value="movies" class="pt-10 px-1 space-y-4">
		<div class="flex flex-col gap-y-1.5 items-center justify-center">
			<Badge variant="outline" class="bg-input px-2">Watchlist</Badge>

			<div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-12 gap-1">
				{const movies = watchlist.filter(media => {
					return media.type === 'movie';
				})}

				{#each movies as movie}
					<Media type="movie" slug={movie.movie.ids.slug} imgSrc={`https://${movie.movie.images.poster[0]}`} alt={movie.movie.title} />
				{/each}
			</div>
		</div>

		<div class="mt-8 flex items-center justify-center">
			<Button href="/discover" variant="outline" size="sm" class="rounded-full px-4 cursor-pointer">Browse movies</Button>
		</div>
	</Tabs.Content>
</Tabs.Root>
