import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getUser = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getUser({
		token: locals.token!,
	});
});

export const getFollowers = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getUserFollowers({
		token: locals.token!,
	});
});
export const getFollowing = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getUserFollowing({
		token: locals.token!,
	});
});

export const getWatchedShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getWatchedShows({
		token: locals.token!,
		userId: 'me',
		limit: 5,
	});
});
export const getFavouriteShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getFavouriteShows({
		token: locals.token!,
		userId: 'me',
		limit: 5,
	});
});

export const getWatchedMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getWatchedMovies({
		token: locals.token!,
		userId: 'me',
		limit: 5,
	});
});
export const getFavouriteMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getFavouriteMovies({
		token: locals.token!,
		userId: 'me',
		limit: 5,
	});
});
