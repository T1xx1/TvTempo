import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getFollowers = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getFollowers({
		token: locals.token!,
	});
});
