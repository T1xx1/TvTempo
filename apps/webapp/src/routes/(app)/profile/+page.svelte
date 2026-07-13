<script lang="ts">
	import { ChartLine, ChevronRight, Clapperboard, Tv } from '@lucide/svelte';
	import { Avatar, ScrollArea } from '@tvtempo/ui';

	import Media from '~/components/Media.svelte';

	import { getFavouriteMovies, getFavouriteShows, getFollowers, getFollowing, getUser } from './page.remote';

	const user = await getUser();
	const url = 'https://media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp';
</script>

<div>
	<!-- header -->
	<div class="relative border-b border-greyish px-2 py-2.5 h-60 flex flex-col justify-between">
		<div
			style={`background-image: url(${url})`}
			class="-z-10 absolute inset-0 bg-no-repeat bg-contain bg-center brightness-50"
		></div>

		<div class="mt-auto flex items-end justify-between">
			<div class="flex gap-2.5 items-center">
				<Avatar.Root class="size-18">
					<Avatar.Image src={user.images.avatar.full} />
					<Avatar.Fallback>{user.username[0]}</Avatar.Fallback>
				</Avatar.Root>

				<span class="text-2xl font-bold">{user.name}</span>
			</div>

			<div class="text-sm flex gap-4 items-center">
				<div class="flex flex-col items-center">
					<span>Followers</span>

					<svelte:boundary>
						{#snippet pending()}
							0
						{/snippet}

						{(await getFollowers()).length}
					</svelte:boundary>
				</div>

				<div class="flex flex-col items-center">
					<span>Following</span>

					<svelte:boundary>
						{#snippet pending()}
							0
						{/snippet}

						{(await getFollowing()).length}
					</svelte:boundary>
				</div>
			</div>
		</div>
	</div>

	<div class="px-1 py-1.5 space-y-4">
		<!-- stats -->
		<div class="space-y-2">
			<a href="/profile/stats" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<ChartLine />
					<span>Statistics</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<div></div>
		</div>

		<!-- media -->
		<div class="space-y-2">
			<a href="/profile/stats" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<Tv />
					<span>Shows</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<div></div>
		</div>

		<div class="space-y-2">
			<a href="/profile/stats" class="group flex items-center justify-between">
				<h2 class="text-lg text-primary flex gap-1 items-center">
					<Tv />
					<span>Favourite shows</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<div>
				<svelte:boundary>
					{const favouriteShows = await getFavouriteShows()}

					<div class="flex gap-1">
						{#each favouriteShows as show}
							<Media type="show" slug={show.show.ids.slug} imgSrc={`https://${show.show.images.poster[0]}`} alt={show.show.title} />
						{/each}
					</div>
				</svelte:boundary>
			</div>
		</div>

		<div class="space-y-2">
			<a href="/profile/stats" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<Clapperboard />
					<span>Movies</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<div></div>
		</div>

		<div class="space-y-2">
			<a href="/profile/stats" class="group flex items-center justify-between">
				<h2 class="text-lg text-primary flex gap-1 items-center">
					<Clapperboard />
					<span>Favourite movies</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<div>
				<svelte:boundary>
					{const favouriteMovies = await getFavouriteMovies()}

					<div class="flex gap-1">
						{#each favouriteMovies as movie}
							<Media type="movie" slug={movie.movie.ids.slug} imgSrc={`https://${movie.movie.images.poster[0]}`} alt={movie.movie.title} />
						{/each}
					</div>

					<pre>{JSON.stringify(favouriteMovies, null, 2)}</pre>
				</svelte:boundary>
			</div>
		</div>
	</div>
</div>
