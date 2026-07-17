import { getRequestEvent, query } from '$app/server';
import { traktClient } from '~/data/trakt.server';

export const getFriends = query(async () => {
	const { locals } = getRequestEvent();

	return traktClient.users.getFriends({
		token: locals.token!,
	});
});
