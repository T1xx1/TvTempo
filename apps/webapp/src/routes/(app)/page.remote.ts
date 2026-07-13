import { getRequestEvent, query } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getUser = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getUser({
		token: locals.token!,
	});
});
