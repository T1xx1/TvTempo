<script lang="ts">
	import { Button } from '@tvtempo/ui';

	import trakt from '~/assets/trakt.svg';
	import tvtempo from '~/assets/tvtempo.svg';
</script>

<div class="h-full flex flex-col items-center justify-center space-y-7">
	<img src={tvtempo} alt="TvTempo" class="size-24 rounded-md" />

	<div class="*:w-68">
		<Button href="/auth/login" variant="secondary" size="lg" class="cursor-pointer">
			<img src={trakt} alt="Trakt" class="size-5" />

			<span>Trakt</span>
		</Button>
	</div>
</div>
