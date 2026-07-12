import { TRAKT_CLIENT_ID, TRAKT_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_AUTH_REDIRECT_URI } from '$env/static/public';
import { TraktClient } from '@tvtempo/trakt-api';

export const traktClient = new TraktClient({
	clientId: TRAKT_CLIENT_ID,
	clientSecret: TRAKT_CLIENT_SECRET,
	redirectUri: PUBLIC_AUTH_REDIRECT_URI,
});
