import { redirect } from '@sveltejs/kit';

import { traktClient } from '~/data/trakt.server';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) => {
	const { url, state } = traktClient.getOauthUrl();

	cookies.set('state', state, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
	});

	throw redirect(302, url);
};
