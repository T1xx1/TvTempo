<script lang="ts">
	import { ChartLine, ChevronRight, Clapperboard, Tv } from '@lucide/svelte';
	import { Avatar, Empty } from '@tvtempo/ui';

	import Grid from '~/components/Grid.svelte';
	import Media from '~/components/Media.svelte';

	import {
		getFavouriteMovies,
		getFavouriteShows,
		getStats,
		getUser,
		getWatchedMovies,
		getWatchedShows,
	} from './page.remote';

	const user = await getUser();
	const stats = await getStats();
	const url = 'https://media.trakt.tv/images/shows/000/039/892/posters/medium/e81b164378.jpg.webp';
</script>

<div>
	<!-- header -->
	<div class="relative bg-muted border border-input rounded-b-md p-2 h-60 flex flex-col justify-between">
		<div
			style={`background-image: url(${url})`}
			class="z-10 absolute inset-0 bg-no-repeat bg-contain bg-center brightness-70"
		></div>

		<div class="z-20 mt-auto flex items-end justify-between">
			<div class="flex gap-2.5 items-center">
				<Avatar.Root class="size-18">
					<Avatar.Image src={user.images.avatar.full} />
					<Avatar.Fallback>{user.username[0]}</Avatar.Fallback>
				</Avatar.Root>

				<span class="text-2xl font-bold">{user.name}</span>
			</div>

			<div class="text-sm flex gap-3 items-center">
				<a href="/profile/followers" class="flex flex-col items-center">
					<span>Followers</span>
					<span>{stats.network.followers}</span>
				</a>

				<a href="/profile/following" class="flex flex-col items-center">
					<span>Following</span>
					<span>{stats.network.following}</span>
				</a>

				<a href="/profile/friends" class="flex flex-col items-center">
					<span>Friends</span>
					<span>{stats.network.friends}</span>
				</a>
			</div>
		</div>
	</div>

	<div class="p-1.5 space-y-4">
		<!-- stats -->
		<div class="space-y-1.5">
			<a href="/profile/stats" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<ChartLine class="size-5" />
					<span>Statistics</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<div class="grid gap-1.5 grid-cols-2">
				<div class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center">
					<span class="text-sm">Shows watched</span>
					<span>{stats.shows.watched}</span>
				</div>

				<div class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center">
					<span class="text-sm">Movies watched</span>
					<span>{stats.movies.watched}</span>
				</div>
			</div>
		</div>

		<div class="space-y-1.5">
			<a href="/profile/shows" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<Tv class="size-5" />
					<span>Shows</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<svelte:boundary>
				{const shows: any[] = []}
				<!-- {const shows = (await getWatchedShows())} -->

				{#if shows.length === 0}
					<Empty.Root>
						<Empty.Header>
							<Empty.Media variant="icon">
								<Tv />
							</Empty.Media>

							<Empty.Title>No shows</Empty.Title>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<Grid>
						{#each shows as show (show.show.ids.trakt)}
							<Media type="show" slug={show.show.ids.slug} imgSrc="" alt={show.show.title} />
						{/each}
					</Grid>
				{/if}
			</svelte:boundary>
		</div>

		<div class="space-y-1.5">
			<a href="/profile/shows" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<Tv class="size-5 text-primary" />
					<span>Favourite shows</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<svelte:boundary>
				{const favouriteShows = (await getFavouriteShows())}

				{#if favouriteShows.length === 0}
					<Empty.Root>
						<Empty.Header>
							<Empty.Media variant="icon">
								<Tv />
							</Empty.Media>

							<Empty.Title>No favourite shows</Empty.Title>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<Grid>
						{#each favouriteShows as show}
							<Media type="show" slug={show.show.ids.slug} imgSrc={`https://${show.show.images.poster[0]}`} alt={show.show.title} />						
						{/each}
					</Grid>
				{/if}
			</svelte:boundary>
		</div>

		<div class="space-y-1.5">
			<a href="/profile/movies" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<Clapperboard class="size-5" />
					<span>Movies</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<svelte:boundary>
				{const movies = (await getWatchedMovies())}

				{#if movies.length === 0}
					<Empty.Root>
						<Empty.Header>
							<Empty.Media variant="icon">
								<Clapperboard />
							</Empty.Media>

							<Empty.Title>No movies</Empty.Title>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<Grid>
						{#each movies as movie}
							<Media type="movie" slug={movie.movie.ids.slug} imgSrc={`https://${movie.movie.images.poster[0]}`} alt={movie.movie.title} />
						{/each}
					</Grid>
				{/if}
			</svelte:boundary>
		</div>

		<div class="space-y-1.5">
			<a href="/profile/movies" class="group flex items-center justify-between">
				<h2 class="text-lg flex gap-1 items-center">
					<Clapperboard class="size-5 text-primary" />
					<span>Favourite movies</span>
				</h2>

				<ChevronRight class="group-hover:translate-x-0.5" />
			</a>

			<svelte:boundary>
				{const favouriteMovies = (await getFavouriteMovies())}

				{#if favouriteMovies.length === 0}
					<Empty.Root>
						<Empty.Header>
							<Empty.Media variant="icon">
								<Clapperboard />
							</Empty.Media>

							<Empty.Title>No favourite movies</Empty.Title>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<Grid>
						{#each favouriteMovies as movie}
							<Media type="movie" slug={movie.movie.ids.slug} imgSrc={`https://${movie.movie.images.poster[0]}`} alt={movie.movie.title} />
						{/each}
					</Grid>
				{/if}
			</svelte:boundary>
		</div>
	</div>
</div>
