import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getUser = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getUserFull({
		token: locals.token!,
	});
});

export const getStats = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getStats({
		token: locals.token!,
	});
});

export const getWatchedShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getWatchedShowsFull({
		token: locals.token!,
		userId: 'me',
		limit: 6,
	});
});
export const getFavouriteShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getFavouriteShowsFull({
		token: locals.token!,
		userId: 'me',
		limit: 6,
	});
});

export const getWatchedMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getWatchedMoviesFull({
		token: locals.token!,
		userId: 'me',
		limit: 6,
	});
});
export const getFavouriteMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getFavouriteMoviesFull({
		token: locals.token!,
		userId: 'me',
		limit: 6,
	});
});
