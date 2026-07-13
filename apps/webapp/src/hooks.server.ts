import { redirect, type Handle } from '@sveltejs/kit';

import { traktClient } from '~/data/trakt.server';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/auth') {
		return resolve(event);
	}

	const refreshToken = event.cookies.get('refresh_token');

	if (!refreshToken) {
		event.cookies.delete('access_token', {
			path: '/',
		});
		event.cookies.delete('refresh_token', {
			path: '/',
		});

		throw redirect(302, '/auth');
	}

	let accessToken = event.cookies.get('access_token');

	if (!accessToken && refreshToken) {
		const { access_token, refresh_token, expires_in } =
			await traktClient.refreshAccessToken(refreshToken);

		event.cookies.set('access_token', access_token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: expires_in,
		});
		event.cookies.set('refresh_token', refresh_token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
		});

		accessToken = access_token;
	}

	/* @ts-expect-error */
	event.locals.token = accessToken;

	return resolve(event);
};
