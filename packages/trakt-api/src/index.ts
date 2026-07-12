import { assert } from '@t1xx1/tsfix';

type Tokens = {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token: string;
	scope: 'public';
	created_at: number;
};

export class TraktClient {
	readonly origin = 'https://trakt.tv';
	readonly apiOrigin = 'https://api.trakt.tv';
	readonly apiVersion = '2';

	fetch = async ({
		path,
		method = 'GET',
		body,
	}: {
		path: string;
		method?: 'GET' | 'POST';
		body?: object;
	}) => {
		const headers = {
			'Content-Type': 'application/json',
			'User-Agent': `${this.appName}/${this.appVersion}`,
			'trakt-api-version': this.apiVersion,
			'trakt-api-key': this.clientId,
		};

		switch (method) {
			case 'GET': {
				return await (
					await fetch(`${this.apiOrigin}/${path}`, {
						method,
						headers,
					})
				).json();
			}
			case 'POST': {
				return await (
					await fetch(`${this.apiOrigin}/${path}`, {
						method,
						headers,
						body: JSON.stringify(body),
					})
				).json();
			}
			default: {
				assert<never>(method);
			}
		}
	};

	/*  */

	readonly appName: string;
	readonly appVersion: string;
	private readonly clientId: string;
	private readonly clientSecret: string;
	public readonly redirectUri: any;

	constructor({
		appName,
		appVersion,
		clientId,
		clientSecret,
		redirectUri,
	}: {
		appName: string;
		appVersion: string;
		clientId: string;
		clientSecret: string;
		redirectUri: string;
	}) {
		this.appName = appName;
		this.appVersion = appVersion;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.redirectUri = redirectUri;
	}

	getOauthUrl = () => {
		const state = crypto.randomUUID();
		const url = new URL(`${this.origin}/oauth/authorize`);

		url.searchParams.append('response_type', 'code');
		url.searchParams.append('client_id', this.clientId);
		url.searchParams.append('redirect_uri', this.redirectUri);
		url.searchParams.append('state', state);

		return {
			url: url.toString(),
			state,
		};
	};

	exchangeCodeForTokens = async (code: string) => {
		return (await this.fetch({
			path: 'oauth/token',
			method: 'POST',
			body: {
				client_id: this.clientId,
				client_secret: this.clientSecret,
				redirect_uri: this.redirectUri,
				grant_type: 'authorization_code',
				code,
			},
		})) as unknown as Tokens;
	};

	refreshAccessToken = async (refreshToken: string) => {
		return (await this.fetch({
			path: 'oauth/token',
			method: 'POST',
			body: {
				client_id: this.clientId,
				client_secret: this.clientSecret,
				redirect_uri: this.redirectUri,
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			},
		})) as unknown as Tokens;
	};
}
