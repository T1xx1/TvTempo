<script lang="ts">
	import Topbar from '~/components/Topbar.svelte';

	import { formatMin } from '~/lib/formatMin';

	import { getStats } from '../page.remote';

	const stats = await getStats();
</script>

<div>
	<Topbar>Statistics</Topbar>

	<div class="p-1.5 pt-13 grid gap-1.5 grid-cols-1 sm:grid-cols-2">
		<div
			class="bg-muted border border-grayish rounded-md p-2 flex flex-col items-center justify-center"
		>
			<span class="text-sm">Episodes watched</span>
			<span>{stats.episodes.watched}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex flex-col items-center justify-center"
		>
			<span class="text-sm">Shows watched</span>
			<span>{stats.shows.watched}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex flex-col items-center justify-center"
		>
			<span class="text-sm">Shows time</span>
			<span>{formatMin(stats.episodes.minutes)}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex flex-col items-center justify-center"
		>
			<span class="text-sm">Movies watched</span>
			<span>{stats.movies.watched}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex flex-col items-center justify-center"
		>
			<span class="text-sm">Movies time</span>
			<span>{formatMin(stats.movies.minutes)}</span>
		</div>
	</div>
</div>
