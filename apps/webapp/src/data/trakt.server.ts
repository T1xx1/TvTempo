import { TRAKT_CLIENT_ID, TRAKT_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_AUTH_REDIRECT_URI } from '$env/static/public';
import { TraktClient } from '@tvtempo/trakt-api';

import { name, version } from '~/../package.json';

export const traktClient = new TraktClient({
	appName: name,
	appVersion: version,
	clientId: TRAKT_CLIENT_ID,
	clientSecret: TRAKT_CLIENT_SECRET,
	redirectUri: PUBLIC_AUTH_REDIRECT_URI,
});
