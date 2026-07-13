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

export const getFavouriteShows = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getFavouriteMedia({
		token: locals.token!,
		userId: 'me',
		type: 'shows',
		sortBy: 'listed_at',
	});
});
export const getFavouriteMovies = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getFavouriteMedia({
		token: locals.token!,
		userId: 'me',
		type: 'movies',
		sortBy: 'listed_at',
	});
});
