import { getRequestEvent, query } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { traktClient } from '~/data/trakt.server';
import { networkTypes } from '~/params/networkType';

export const getNetwork = query(z.enum(networkTypes), async (network) => {
	const { locals } = getRequestEvent();

	switch (network) {
		case 'following': {
			return await traktClient.users.getFollowing({
				token: locals.token!,
			});
		}
		case 'followers': {
			return await traktClient.users.getFollowers({
				token: locals.token!,
			});
		}
		case 'friends': {
			return await traktClient.users.getFriends({
				token: locals.token!,
			});
		}
		default: {
			redirect(302, '/profile');
		}
	}
});
