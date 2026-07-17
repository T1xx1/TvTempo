import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getWatchedMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getWatchedMovies({
		token: locals.token!,
		userId: 'me',
		extended: 'full',
	});
});
