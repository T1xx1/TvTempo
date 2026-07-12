import { redirect } from '@sveltejs/kit';

import { traktClient } from '~/data/trakt.server';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	throw redirect(302, traktClient.getOauthUrl());
};
