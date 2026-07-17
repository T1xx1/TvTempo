import { redirect } from '@sveltejs/kit';

import { traktClient } from '~/data/trakt.server';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const state = url.searchParams.get('state');

	if (!state) {
		throw redirect(302, '/auth?err=noState');
	}

	const storedState = cookies.get('state');

	cookies.delete('state', {
		path: '/',
	});

	if (storedState !== state) {
		throw redirect(302, '/auth?err=unsecureExchange');
	}

	/*  */

	const code = url.searchParams.get('code');

	if (!code) {
		throw redirect(302, '/auth?err=noCode');
	}

	const { access_token, refresh_token, expires_in } = await traktClient.oauth.exchangeCodeForTokens(code);

	cookies.set('access_token', access_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: expires_in,
	});
	cookies.set('refresh_token', refresh_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
	});

	throw redirect(302, '/dashboard');
};
