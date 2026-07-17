import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getFollowing = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getFollowing({
		token: locals.token!,
	});
});
