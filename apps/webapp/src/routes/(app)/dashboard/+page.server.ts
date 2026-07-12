import { auth } from '~/data/authorization.server';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const token = auth.user(locals);

	return {
		token,
	};
};
