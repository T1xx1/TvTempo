<script lang="ts">
	import { Bookmark, Clapperboard, Popcorn, Sparkles, Tv } from '@lucide/svelte';
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

	<div class="pt-12 px-1">
		<Tabs.Content value="shows" class="space-y-4">
			<div class="flex flex-col gap-y-2 items-center justify-center">
				<Badge variant="outline" class="bg-input px-2">
					<Popcorn />
					<span>Watching</span>
				</Badge>

				<div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-12 gap-1">
					{const movies = [
						{
							show: {
								ids: {
									slug: 'gravity-falls',
								},
								title: 'Gravity falls',
								images: {
									poster: [
										'media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp'
									]
								}
							}
						},
						{
							show: {
								ids: {
									slug: 'gravity-falls',
								},
								title: 'Gravity falls',
								images: {
									poster: [
										'media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp'
									]
								}
							}
						},
						{
							show: {
								ids: {
									slug: 'gravity-falls',
								},
								title: 'Gravity falls',
								images: {
									poster: [
										'media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp'
									]
								}
							}
						},
						{
							show: {
								ids: {
									slug: 'gravity-falls',
								},
								title: 'Gravity falls',
								images: {
									poster: [
										'media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp'
									]
								}
							}
						}
					]}

					{#each movies as show}
						<Media type="show" slug={show.show.ids.slug} imgSrc={`https://${show.show.images.poster[0]}`} alt={show.show.title} />	
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-y-2 items-center justify-center">
				<Badge variant="outline" class="bg-input px-2">
					<Bookmark />
					<span>Watchlist</span>
				</Badge>

				<div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-12 gap-1">
					{const movies = watchlist.filter(media => {
						return media.type === 'show';
					})}

					{#each movies as show}
						<Media type="show" slug={show.show.ids.slug} imgSrc={`https://${show.show.images.poster[0]}`} alt={show.show.title} />	
					{/each}
				</div>
			</div>

			<div class="mt-10 flex items-center justify-center">
				<Button href="/discover" variant="outline" size="sm" class="rounded-full px-4 cursor-pointer">
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

				<div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-12 gap-1">
					{const movies = watchlist.filter(media => {
						return media.type === 'movie';
					})}

					{#each movies as movie}
						<Media type="movie" slug={movie.movie.ids.slug} imgSrc={`https://${movie.movie.images.poster[0]}`} alt={movie.movie.title} />
					{/each}
				</div>
			</div>

			<div class="mt-10 flex items-center justify-center">
				<Button href="/discover" variant="outline" size="sm" class="rounded-full px-4 cursor-pointer">
					<Sparkles />
					<span>Browse movies</span>
				</Button>
			</div>
		</Tabs.Content>
	</div>
</Tabs.Root>
