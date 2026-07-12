import { redirect } from '@sveltejs/kit';
import { tryCatch } from '@t1xx1/tsfix';

import { traktClient } from '~/data/trakt.server';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url);

	const code = url.searchParams.get('code');

	if (!code) {
		throw redirect(302, '/auth?err=noCode');
	}

	const { data, error } = await tryCatch(async () => {
		return await traktClient.exchangeCodeForTokens(code);
	});

	console.log(data);

	if (error || !data) {
		throw redirect(302, '/auth?err=unsecureExchange');
	}

	return new Response(await data?.text());
};
