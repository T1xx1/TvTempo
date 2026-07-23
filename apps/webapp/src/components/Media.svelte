<script lang="ts">
	import { Heart } from '@lucide/svelte';

	let {
		type,
		slug,
		imgSrc,
		alt,
		isFavourite = false,
	}: {
		type: 'movie' | 'show';
		slug: string;
		imgSrc: string;
		alt: string;
		isFavourite?: boolean;
	} = $props();
</script>

<a
	href={`/m/${type}/${slug}`}
	class="relative bg-muted border border-input/25 rounded-lg aspect-[1/1.42]"
>
	{#if imgSrc === ''}
		<div class="size-full flex items-center justify-center">
			<span class="text-sm text-center">{alt}</span>
		</div>
	{:else}
		<img src={imgSrc} alt="" class="rounded-lg size-full" loading="lazy" />
	{/if}

	{#if isFavourite}
		<Heart class="absolute top-1.5 right-1.5 size-4 stroke-red-500 fill-red-500 " />
	{/if}
</a>
