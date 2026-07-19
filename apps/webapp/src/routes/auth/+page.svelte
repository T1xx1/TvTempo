<script lang="ts">
	import { Button } from '@tvtempo/ui';

	import splash from '~/assets/splash.png';
	import trakt from '~/assets/trakt.svg';
	import tvtempo from '~/assets/tvtempo.svg';
</script>

<div class="relative h-full flex flex-col items-center justify-center space-y-6">
	<div
		style={`background-image: url(${splash})`}
		class="-z-10 absolute inset-0 bg-no-repeat bg-cover bg-center h-full brightness-30"
	></div>

	<img src={tvtempo} alt="TvTempo" class="-mt-12 size-18 rounded-md" />

	<div>
		<Button href="/auth/login" variant="secondary" size="lg" class="cursor-pointer w-60 gap-2">
			<img src={trakt} alt="Trakt" class="size-5" />

			<span>Login</span>
		</Button>
	</div>
</div>
