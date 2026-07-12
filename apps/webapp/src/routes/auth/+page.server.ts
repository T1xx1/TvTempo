import { redirect } from '@sveltejs/kit';

import { auth } from '~/data/authorization.server';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (auth.isUser(locals)) {
		throw redirect(302, '/dashboard');
	}
};
