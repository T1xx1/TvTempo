import { assert } from '@t1xx1/tsfix';

export class TraktClient {
	readonly origin = 'https://trakt.tv';
	readonly apiOrigin = 'https://api.trakt.tv';
	readonly apiVersion = '2';

	fetch = async (
		path: string,
		method: 'GET' | 'POST' = 'GET',
		body?: {
			[key: string]: string;
		},
	) => {
		const headers = {
			'Content-Type': 'application/json',
			'User-Agent': `${this.appName}/${this.appVersion}`,
			'trakt-api-version': this.apiVersion,
			'trakt-api-key': this.clientId,
		};

		switch (method) {
			case 'GET': {
				return await fetch(`${this.apiOrigin}/${path}`, {
					method,
					headers,
				});
			}
			case 'POST': {
				return await fetch(`${this.apiOrigin}/${path}`, {
					method,
					headers,
					body: JSON.stringify(body),
				});
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

	getOauthUrl = (): string => {
		const url = new URL(`${this.origin}/oauth/authorize`);

		url.searchParams.append('response_type', 'code');
		url.searchParams.append('client_id', this.clientId);
		url.searchParams.append('redirect_uri', this.redirectUri);

		return url.toString();
	};
	exchangeCodeForTokens = async (code: string) => {
		const a = await this.fetch('oauth/token', 'POST', {
			code,
			client_id: this.clientId,
			client_secret: this.clientSecret,
			redirect_uri: this.redirectUri,
			grant_type: 'authorization_code',
		});

		console.log(a);

		return a;
	};
}
