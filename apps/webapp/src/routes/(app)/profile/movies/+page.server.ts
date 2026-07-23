import { auth } from '~/data/authorization.server';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	auth.user(locals);

	const isFavourite = url.searchParams.has('isFavourite');

	url.searchParams.delete('isFavourite');

	return {
		isFavourite,
	};
};
