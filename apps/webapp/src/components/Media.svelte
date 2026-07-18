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

<a href={`/${type}/${slug}`} class="bg-muted border border-input rounded-lg">
	<img src={imgSrc} {alt} class="rounded-lg" />
</a>
