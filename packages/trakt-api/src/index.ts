import { assert } from '@t1xx1/tsfix';

export class TraktClient {
	readonly origin = 'https://api.trakt.tv';

	fetch = async (
		path: string,
		method: 'GET' | 'POST' = 'GET',
		body?: {
			[key: string]: string;
		},
	) => {
		const headers = {
			'Content-Type': 'application/json',
			'trakt-api-version': '2',
			'trakt-api-key': this.clientId,
		};

		switch (method) {
			case 'GET': {
				return await fetch(`${this.origin}/${path}`, {
					method,
					headers,
				});
			}
			case 'POST': {
				return await fetch(`${this.origin}/${path}`, {
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

	private readonly clientId: string;
	private readonly clientSecret: string;
	public readonly redirectUri: any;

	constructor({
		clientId,
		clientSecret,
		redirectUri,
	}: {
		clientId: string;
		clientSecret: string;
		redirectUri: string;
	}) {
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.redirectUri = redirectUri;
	}

	getOauthUrl = (): string => {
		const url = new URL('https://trakt.tv/oauth/authorize');

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
