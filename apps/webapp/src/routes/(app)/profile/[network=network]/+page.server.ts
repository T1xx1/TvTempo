import { auth } from '~/data/authorization.server';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	auth.user(locals);

	return {
		network: params.network,
	};
};
