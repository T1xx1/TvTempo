<script lang="ts">
	let {
		type,
		slug,
		imgSrc,
		alt,
	}: {
		type: 'movie' | 'show';
		slug: string;
		imgSrc: string;
		alt: string;
	} = $props();
</script>

<a href={`/${type}/${slug}`} class="bg-muted border border-input rounded-lg aspect-[1/1.42]">
	{#if imgSrc === ''}
		<div class="size-full flex items-center justify-center">
			<span class="text-sm">{alt}</span>
		</div>
	{:else}
		<img src={imgSrc} {alt} class="rounded-lg" loading="lazy" />
	{/if}
</a>
