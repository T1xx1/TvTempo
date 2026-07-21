import { auth } from '~/data/authorization.server';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	auth.user(locals);

	return {
		isFavourite: url.searchParams.has('isFavourite'),
	};
};
