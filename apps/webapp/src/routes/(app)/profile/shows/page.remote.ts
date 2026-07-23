import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getWatchedShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getWatchedShowsFullAll({
		token: locals.token!,
		userId: 'me',
	});
});
export const getFavouriteShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getFavouriteShowsFull({
		token: locals.token!,
		userId: 'me',
	});
});
