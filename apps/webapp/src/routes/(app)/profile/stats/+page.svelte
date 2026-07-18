<script lang="ts">
	import Topbar from '~/components/Topbar.svelte';

	import { getStats } from '../page.remote';

	const stats = await getStats();

	const formatMin = (min: number): string => {
		if (min < 60) {
			return `${min}min`;
		}

		let h = Math.floor(min / 60);
		min = min % 60;

		if (h < 24) {
			return `${h}h ${min}min`;
		}

		let d = Math.floor(h / 24);
		h = h % 24;

		if (d < 31) {
			return `${d}d ${h}h ${min}min`;
		}

		let m = Math.floor(d / 31);
		d = d % 31;

		return `${m}m ${d}d ${h}h ${min}min`;
	};
</script>

<div>
	<Topbar>Statistics</Topbar>

	<div class="p-1.5 pt-13 grid gap-1.5 grid-cols-1 sm:grid-cols-2">
		<div
			class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center"
		>
			<span>Episodes watched</span>
			<span>{stats.episodes.watched}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center"
		>
			<span>Shows watched</span>
			<span>{stats.shows.watched}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center"
		>
			<span>Shows time</span>
			<span>{formatMin(stats.episodes.minutes)}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center"
		>
			<span>Movies watched</span>
			<span>{stats.movies.watched}</span>
		</div>

		<div
			class="bg-muted border border-grayish rounded-md p-2 flex gap-0.5 flex-col items-center justify-center"
		>
			<span>Movies time</span>
			<span>{formatMin(stats.movies.minutes)}</span>
		</div>
	</div>
</div>
