import { assert } from '@t1xx1/tsfix';

export type Token = string;
export type Tokens = {
	access_token: Token;
	token_type: 'Bearer';
	/**
	 * [ms]
	 */
	expires_in: number;
	refresh_token: Token;
	scope: 'public';
	created_at: number;
};

export type UserId = 'me' | number;
export type MediaType = 'movie' | 'show' | 'season' | 'episode' | 'person' | 'user';

export type User = {
	username: string;
	private: boolean;
	deleted: boolean;
	name: null | string;
	vip: null | boolean;
	vip_ep: null | boolean;
	director: null | boolean;
	ids: {
		slug: null | string;
		trakt: number;
	};
};
export type UserImages = User & {
	images: {
		avatar: {
			full: string;
		};
	};
};
export type UserFull = UserImages & {};

export type Show = {
	title: string;
	year: number;
	ids: {
		trakt: number;
		slug: string;
		tvdb: number;
		imdb: string;
		tmdb: number;
		tvrage: null;
	};
};
export type ShowImages = Show & {
	images: {
		fanart: string[];
		poster: string[];
		logo: string[];
		clearart: string[];
		banner: string[];
		thumb: string[];
	};
};
export type ShowFull = ShowImages & {};

export type Movie = {
	title: string;
	year: number;
	ids: {
		trakt: number;
		slug: string;
		imdb: string;
		tmdb: number;
	};
};
export type MovieImages = Movie & {
	images: {
		fanart: string[];
		poster: string[];
		logo: string[];
		clearart: string[];
		banner: string[];
		thumb: string[];
	};
};
export type MovieFull = MovieImages & {};

export class TraktClient {
	readonly origin = 'https://trakt.tv';
	readonly apiOrigin = 'https://api.trakt.tv';
	readonly apiVersion = '2';

	fetch = async ({
		path,
		method = 'GET',
		token = null,
		body = {},
	}: {
		path: string;
		method?: 'GET' | 'POST';
		token?: null | string;
		body?: Record<string, string>;
	}) => {
		const headers = {
			'Content-Type': 'application/json',
			'User-Agent': `${this.appName}/${this.appVersion}`,
			'trakt-api-version': this.apiVersion,
			'trakt-api-key': this.clientId,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		switch (method) {
			case 'GET': {
				const res = await fetch(`${this.apiOrigin}/${path}`, {
					method,
					headers,
				});

				return await res.json();
			}
			case 'POST': {
				const res = await fetch(`${this.apiOrigin}/${path}`, {
					method,
					headers,
					body: JSON.stringify(body),
				});

				return await res.json();
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
	readonly redirectUri: string;

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

	/* auth */
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

	exchangeOauthCodeForTokens = async (code: string) => {
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
		})) as Tokens;
	};

	// getdeviceCode = () => {};
	// exchangeDeviceCodeForTokens = (code: string) => {};

	refreshAccessToken = async (refreshToken: Token) => {
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
		})) as Tokens;
	};

	// revokeAccessToken = async (token: string) => {};

	/* users */

	getUser = async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
		return (await this.fetch({
			path: `users/${userId}?extended=images`,
			token,
		})) as UserImages;
	};

	getUserFollowers = async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
		return (await this.fetch({
			path: `users/${userId}/followers?extended=images`,
			token,
		})) as {
			friends_at: string;
			total_count: number;
			user: UserImages;
		}[];
	};
	getUserFollowing = async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
		return (await this.fetch({
			path: `users/${userId}/following?extened=images`,
			token,
		})) as {
			friends_at: string;
			total_count: number;
			user: UserImages;
		}[];
	};

	getWatchlist = async ({
		token,
		userId = 'me',
		type,
		sortBy = '',
		sortHow = 'asc',
	}: {
		token: Token;
		userId?: UserId;
		type: 'movie' | 'show' | 'movie,show';
		sortBy?: '' | 'title';
		sortHow?: 'asc' | 'desc';
	}) => {
		return (await this.fetch({
			path: `users/${userId}/watchlist/${type}/${sortBy}/${sortHow}?extended=images`,
			token,
		})) as (
			| ({
					rank: number;
					id: number;
					listed_at: Date;
			  } & {
					type: 'movie';
					movie: MovieImages;
			  })
			| {
					type: 'show';
					notes: null | string;
					show: ShowImages;
			  }
		)[];
	};

	// getWatchedMedia = async ({ token, userId }: { token: string; userId?: UserId }) => {};

	getFavouriteMedia = async ({
		token,
		userId = 'me',
		type,
		sortBy = '',
		limit = 5,
	}: {
		token: Token;
		userId?: UserId;
		type: 'movies' | 'shows';
		sortBy?: '' | 'listed_at';
		limit?: number;
	}) => {
		return (await this.fetch({
			path: `users/${userId}/favorites/${type}/${sortBy}?limit=${limit}&extended=full`,
			token,
		})) as (
			| ({
					id: number;
					rank: number;
					listed_at: Date;
					notes: null | string;
					my_rating: null | number;
			  } & {
					type: 'show';
					show: ShowFull;
			  })
			| {
					type: 'movie';
					movie: MovieFull;
			  }
		)[];
	};
}
