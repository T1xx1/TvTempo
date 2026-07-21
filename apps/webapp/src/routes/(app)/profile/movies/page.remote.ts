import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getWatchedMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getWatchedMoviesFullAll({
		token: locals.token!,
		userId: 'me',
	});
});
export const getFavouriteMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getFavouriteMoviesFull({
		token: locals.token!,
		userId: 'me',
	});
});
