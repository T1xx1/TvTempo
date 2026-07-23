<script lang="ts">
	import { ArrowLeft, ChevronDown, Globe, Image } from '@lucide/svelte';
	import { Badge, Button, Collapsible, Empty, Tabs } from '@tvtempo/ui';

	import facebook from '~/assets/facebook.svg';
	import imdb from '~/assets/imdb.svg';
	import instagram from '~/assets/instagram.svg';
	import plex from '~/assets/plex.svg';
	import tmdb from '~/assets/tmdb.svg';
	import trakt from '~/assets/trakt.svg';
	import tvdb from '~/assets/tvdb.svg';
	import twitter from '~/assets/twitter.svg';
	import wikipedia from '~/assets/wikipedia.svg';

	import { formatMin } from '~/lib/formatMin';
	import { formatNum } from '~/lib/formatNum';

	import { getEpisodes, getMedia, getSeasons } from './page.remote';

	const { data } = $props();
	const { mediaType, slug } = $derived(data);

	const media = $derived(
		await getMedia({
			mediaType,
			slug,
		}),
	);
</script>

<div class="space-y-1">
	<div
		class="relative bg-muted border border-input rounded-b-md p-1 h-44 flex flex-col justify-between"
	>
		<div
			style={`background-image: url(https://${media?.images?.fanart[0]})`}
			class="z-10 absolute inset-0 bg-no-repeat bg-cover bg-center rounded-b-md brightness-60"
		></div>

		<div class="z-10">
			<Button
				variant="ghost"
				class="cursor-pointer"
				onclick={() => {
					history.back();
				}}
			>
				<ArrowLeft />
			</Button>
		</div>

		<div class="z-10 p-1.5 flex flex-col">
			<span class="text-lg font-semibold">{media.title}</span>

			{#if media.type === 'show'}
				<span class="text-xs">{media.network}</span>
			{/if}
		</div>
	</div>

	<Tabs.Root value="info">
		<Tabs.List class="h-8! w-full">
			<Tabs.Trigger value="info" class="cursor-pointer">Info</Tabs.Trigger>
			
			{#if media.type === 'show'}
				<Tabs.Trigger value="episodes" class="cursor-pointer">Episodes ({media.aired_episodes})</Tabs.Trigger>
			{/if}

			<Tabs.Trigger value="images" class="cursor-pointer">Images</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="info">
			<div class="px-1.5 space-y-4">
				<div class="space-y-1.5">
					<div class="text-lg font-semibold">Info</div>

					<div class="flex gap-1.5 items-center">					
						<div class="bg-muted border border-input rounded-md py-2 w-full flex flex-col gap-0.5 items-center">
							<span class="text-sm">Time</span>
							<span>
								{#if media.type === 'show' && media.total_runtime}
									{formatMin(media.total_runtime)}
								{:else if media.runtime}
									{formatMin(media.runtime)}
								{/if}
							</span>
						</div>

						<div class="bg-muted border border-input rounded-md py-2 w-full flex flex-col gap-0.5 items-center">
							<span class="text-sm">Year</span>
							<span>{media.year}</span>
						</div>	

						<div class="bg-muted border border-input rounded-md py-2 w-full flex flex-col gap-0.5 items-center">
							<span>Rating</span>
							<span>{((media.rating)?.toFixed(1))} ({formatNum(media.votes)})</span>
						</div>
					</div>

					<div class="my-4 px-1">{media.overview}</div>

					<div class="space-y-1.5">
						<div class="font-semibold">Genres</div>
						<div class="flex flex-wrap gap-1.5 items-center">
							{#each [...(media.genres ?? []), ...(media.subgenres ?? [])] as genre (genre)}
								<Badge variant="outline">{genre}</Badge>
							{/each}
						</div>
					</div>
				</div>

				{#if media.trailer}
					<div class="space-y-1.5">
						<div class="text-lg font-semibold">Trailer</div>

						{const videoId = new URL(media.trailer).searchParams.get('v')}

						<iframe src={`https://www.youtube.com/embed/${videoId}`} class="rounded-lg aspect-video w-full" title="YouTube" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
					</div>
				{/if}

				<div class="mt-12 flex items-center justify-center">
					<Button href={`https://app.trakt.tv/shows/${media.ids.trakt}`} target="_blank" variant="ghost" class="rounded-full">
						<img src={trakt} alt="Trakt" class="size-4" loading="lazy" />
					</Button>

					<Button href={`https://themoviedb.org/tv/${media.ids.tmdb}`} target="_blank" variant="ghost" class="rounded-full">
						<img src={tmdb} alt="TMDB" class="size-4" loading="lazy" />
					</Button>

					<Button href={`https://imdb.com/title/${media.ids.imdb}`} target="_blank" variant="ghost" class="rounded-full">
						<img src={imdb} alt="IMDB" class="size-4" loading="lazy" />
					</Button>

					<Button href={`https://watch.plex.tv/show/${media.ids.plex.slug}`} target="_blank" variant="ghost" class="rounded-full">
						<img src={plex} alt="Plex" class="size-4" loading="lazy" />
					</Button>

					<Button href={`https://thetvdb.com/series/${media.ids.slug}`} target="_blank" variant="ghost" class="rounded-full">
						<img src={tvdb} alt="TVDB" class="size-4" loading="lazy" />
					</Button>

					<Button href={media.homepage} target="_blank" variant="ghost" class="rounded-full">
						<Globe class="size-4" />
					</Button>

					{#if media.social_ids && media.social_ids.wikipedia !== null && media.social_ids.wikipedia !== ''}
						<Button href={`https://wikipedia.org/wiki/${media.social_ids.wikipedia}`} target="_blank" variant="ghost" class="rounded-full">
							<img src={wikipedia} alt="Wikipedia" class="size-4" />
						</Button>
					{/if}

					{#if media.social_ids && media.social_ids.instagram !== null && media.social_ids.instagram !== ''}
						<Button href={`https://instagram.com/${media.social_ids.instagram}`} target="_blank" variant="ghost" class="rounded-full">
							<img src={instagram} alt="Instagram" class="size-4" />
						</Button>
					{/if}

					{#if media.social_ids && media.social_ids.twitter !== null && media.social_ids.twitter !== ''}
						<Button href={`https://twitter.com/${media.social_ids.twitter}`} target="_blank" variant="ghost" class="rounded-full">
							<img src={twitter} alt="Twitter" class="size-4" />
						</Button>
					{/if}

					{#if media.social_ids && media.social_ids.facebook !== null && media.social_ids.facebook !== ''}
						<Button href={`https://facebook.com/${media.social_ids.facebook}`} target="_blank" variant="ghost" class="rounded-full">
							<img src={facebook} alt="Facebook" class="size-4" />
						</Button>
					{/if}
				</div>
			</div>
		</Tabs.Content>

		{#if mediaType === 'show'}
			<Tabs.Content value="episodes">
				{const seasons = $derived(await getSeasons(slug))}

				<div class="px-1 flex flex-col gap-2">
					{#each seasons as season, i (season.number)}
						{const episodes = $derived(await getEpisodes({ slug, season: season.number }))}
						{let open = $state(false)}

						<Collapsible.Root>
							<Collapsible.Trigger class="bg-muted border border-input rounded-md py-2 px-2.5 w-full flex items-center justify-between" onclick={() => {
								open = !open;
							}}>
								<span class="font-semibold">{season.title}</span>
								
								<div class="flex gap-4 items-center">
									<span>{episodes.length}</span>

									<ChevronDown class={['size-4 cursor-pointer', open ? 'rotate-180' : '']} />
								</div>
							</Collapsible.Trigger>

							<Collapsible.Content class="pt-1 flex flex-col gap-1">
								{#each episodes as episode, i (episode.number)}
									<div class="bg-muted border border-input rounded-md flex gap-2 items-center">
										<div style={`background-image: url(https://${episode.images.screenshot[0]})`} class="bg-no-repeat bg-center bg-cover rounded-l-md aspect-square h-16"></div>

										<div>
											<div class="flex flex-col">
												<span class="text-sm">Episode {i + 1}</span>
												<span class="text-[10px]">{episode.title}</span>
											</div>

											<div></div>
										</div>
									</div>
								{/each}
							</Collapsible.Content>
						</Collapsible.Root>
					{/each}
				</div>
			</Tabs.Content>
		{/if}

		<Tabs.Content value="images">
			<div>
				{const images = [
					...(media.images?.banner ?? []),
					...(media.images?.clearart ?? []),
					...(media.images?.fanart ?? []),
					...(media.images?.logo ?? []),
					...(media.images?.poster ?? []),
					...(media.images?.thumb ?? []),
				]}

				{#if images.length === 0}
					<Empty.Root>
						<Empty.Header>
							<Empty.Media variant="icon">
								<Image />
							</Empty.Media>

							<Empty.Title>No images</Empty.Title>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<div class="grid grid-cols-3 md:grid-cols-4 gap-1">
						{#each images as image (image)}
							<a href={`https://${image}`} target="_blank" title={media.title} style={`background-image: url(https://${image})`} class="bg-contain bg-no-repeat bg-center bg-muted border border-input/25 rounded-lg size-full aspect-square"></a>
						{/each}
					</div>
				{/if}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>
