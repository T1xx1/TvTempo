import { assert } from '@t1xx1/tsfix';

import type {
	Token,
	Tokens,
	UserId,
	User,
	UserFull,
	UserImages,
	MovieFull,
	ShowFull,
	Movie,
	Show,
} from './types.js';

export class TraktClient {
	readonly origin = 'https://trakt.tv';
	readonly apiOrigin = 'https://api.trakt.tv';
	readonly apiVersion = '2';

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

	fetch = async ({
		url,
		method = 'GET',
		token = null,
		body = {},
	}: {
		url: URL;
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
				return await fetch(url, {
					method: 'GET',
					headers,
				});
			}
			case 'POST': {
				return await fetch(url, {
					method: 'POST',
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

	oauth = {
		// device: {
		/**
		 * @see https://docs.trakt.tv/reference/postoauthdevicecode
		 */
		// getCode: () => {},

		/**
		 * @see https://docs.trakt.tv/reference/postoauthdevicetoken
		 */
		// pollCodeForTokens: (code: string) => {},
		// },

		/**
		 * @see https://docs.trakt.tv/reference/getoauthauthorize
		 */
		getUrl: () => {
			const state = crypto.randomUUID();
			const url = new URL(`${this.origin}/oauth/authorize`);

			url.searchParams.append('response_type', 'code');
			url.searchParams.append('client_id', this.clientId);
			url.searchParams.append('redirect_uri', this.redirectUri);
			url.searchParams.append('state', state);

			return {
				url,
				state,
			};
		},

		/**
		 * @see https://docs.trakt.tv/reference/postoauthtoken
		 */
		exchangeCodeForTokens: async (code: string) => {
			const url = new URL(`${this.apiOrigin}/oauth/token`);

			const res = await this.fetch({
				url,
				method: 'POST',
				body: {
					client_id: this.clientId,
					client_secret: this.clientSecret,
					redirect_uri: this.redirectUri,
					code,
					grant_type: 'authorization_code',
				},
			});

			return (await res.json()) as Tokens;
		},

		/**
		 * @see https://docs.trakt.tv/reference/postoauthtoken
		 */
		refreshAccessToken: async (refreshToken: Token) => {
			const url = new URL(`${this.apiOrigin}/oauth/token`);

			const res = await this.fetch({
				url,
				method: 'POST',
				body: {
					client_id: this.clientId,
					client_secret: this.clientSecret,
					redirect_uri: this.redirectUri,
					refresh_token: refreshToken,
					grant_type: 'refresh_token',
				},
			});

			return (await res.json()) as Tokens;
		},

		/**
		 * @see https://docs.trakt.tv/reference/postoauthrevoke
		 */
		revokeAccessToken: async (accessToken: Token) => {
			const url = new URL(`${this.apiOrigin}/oauth/revoke`);

			const res = await this.fetch({
				url,
				method: 'POST',
				body: {
					token: accessToken,
					client_id: this.clientId,
					client_secret: this.clientSecret,
				},
			});

			return await res.json();
		},
	};

	// calendars = {};
	// checkin = {};

	users = {
		// ...

		/**
		 * @see https://docs.trakt.tv/reference/getusersprofile
		 */
		getUser: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as User;
		},
		/**
		 * @deprecated Use `getUserFull` instead
		 * @see https://docs.trakt.tv/reference/getusersprofile
		 */
		getUserImages: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}?extended=images`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as UserImages;
		},
		/**
		 * @see https://docs.trakt.tv/reference/getusersprofile
		 */
		getUserFull: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}?extended=full`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as UserFull;
		},

		// ...

		/**
		 * @see https://docs.trakt.tv/reference/getusersstats
		 */
		getStats: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/stats`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				seasons: {
					/**
					 * [int]
					 */
					rating: number;
					/**
					 * [int]
					 */
					comments: number;
				};
				shows: {
					/**
					 * [int]
					 */
					ratings: number;
					/**
					 * [int]
					 */
					comments: number;
					/**
					 * [int]
					 */
					watched: number;
					/**
					 * [int]
					 */
					collected: number;
				};
				movies: {
					/**
					 * [int]
					 */
					ratings: number;
					/**
					 * [int]
					 */
					comments: number;
					/**
					 * [int]
					 */
					watched: number;
					/**
					 * [int]
					 */
					collected: number;
					/**
					 * [int]
					 */
					plays: number;
					/**
					 * [int]
					 */
					minutes: number;
				};
				episodes: {
					/**
					 * [int]
					 */
					ratings: number;
					/**
					 * [int]
					 */
					comments: number;
					/**
					 * [int]
					 */
					watched: number;
					/**
					 * [int]
					 */
					collected: number;
					/**
					 * [int]
					 */
					plays: number;
					/**
					 * [int]
					 */
					minutes: number;
				};
				network: {
					/**
					 * [int]
					 */
					friends: number;
					/**
					 * [int]
					 */
					followers: number;
					/**
					 * [int]
					 */
					following: number;
				};
				ratings: {
					/**
					 * [int]
					 */
					total: number;
					distribution: {
						/**
						 * [int]
						 */
						1: number;
						/**
						 * [int]
						 */
						2: number;
						/**
						 * [int]
						 */
						3: number;
						/**
						 * [int]
						 */
						4: number;
						/**
						 * [int]
						 */
						5: number;
						/**
						 * [int]
						 */
						6: number;
						/**
						 * [int]
						 */
						7: number;
						/**
						 * [int]
						 */
						8: number;
						/**
						 * [int]
						 */
						9: number;
						/**
						 * [int]
						 */
						10: number;
					};
				};
			};
		},

		// ...

		/**
		 * @see https://docs.trakt.tv/reference/getusersfollowers
		 */
		getFollowers: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/followers`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [date]
				 */
				friends_at: string;
				user: UserFull;
				/**
				 * [int]
				 */
				total_count: number;
			}[];
		},

		/**
		 * @see https://docs.trakt.tv/reference/getusersfollowing
		 */
		getFollowing: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/following`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [date]
				 */
				friends_at: string;
				user: UserFull;
				/**
				 * [int]
				 */
				total_count: number;
			}[];
		},

		/**
		 * @see https://docs.trakt.tv/reference/getusersfriends
		 */
		getFriends: async ({ token, userId = 'me' }: { token: Token; userId?: UserId }) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/friends`);

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [date]
				 */
				friends_at: string;
				user: UserFull;
				/**
				 * [int]
				 */
				total_count: number;
			}[];
		},

		// ...

		/**
		 * @see https://docs.trakt.tv/reference/getuserswatchlistall
		 */
		getWatchlist: async ({
			token,
			userId = 'me',
			type = 'movie,show',
			sortBy = 'listed_at',
			sortHow = 'asc',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			type?: 'movie' | 'show' | 'movie,show';
			sortBy?: 'listed_at' | 'title';
			sortHow?: 'asc' | 'desc';
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
			// ...
		}) => {
			const url = new URL(
				`${this.apiOrigin}/users/${userId}/watchlist/${type}/${sortBy}/${sortHow}`,
			);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			type BaseMedia = {
				/**
				 * [int]
				 */
				rank: number;
				/**
				 * [int]
				 */
				id: number;
				/**
				 * [date]
				 */
				listed_at: string;
				notes: null | string;
				my_rating: null | number;
			};

			type M = BaseMedia &
				Movie & {
					type: 'movie';
				};
			type S = BaseMedia &
				Show & {
					type: 'show';
				};

			return (await res.json()) as (M | S)[];
		},
		/**
		 * @see https://docs.trakt.tv/reference/getuserswatchlistall
		 */
		getWatchlistFull: async ({
			token,
			userId = 'me',
			type = 'movie,show',
			sortBy = '',
			sortHow = 'asc',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			type?: 'movie' | 'show' | 'movie,show';
			sortBy?: '' | 'title';
			sortHow?: 'asc' | 'desc';
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(
				`${this.apiOrigin}/users/${userId}/watchlist/${type}/${sortBy}/${sortHow}?extended=full`,
			);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			type BaseMedia = {
				/**
				 * [int]
				 */
				rank: number;
				/**
				 * [int]
				 */
				id: number;
				/**
				 * [date]
				 */
				listed_at: string;
				notes: null | string;
				my_rating: null | number;
			};

			type Movie = BaseMedia &
				MovieFull & {
					type: 'movie';
				};
			type Show = BaseMedia &
				ShowFull & {
					type: 'show';
				};

			return (await res.json()) as (Movie | Show)[];
		},

		// ...

		/**
		 * @see https://docs.trakt.tv/reference/getuserswatchedtyped
		 * @see https://docs.trakt.tv/reference/getuserswatchedminimalmovies
		 */
		getWatchedMovies: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: string;
			userId?: UserId;
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/watched/movies`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			const movies = (await res.json()) as {
				/**
				 * [date]
				 */
				last_updated_at: string;
				/**
				 * [date]
				 */
				last_watched_at: string;
				movie: Movie;
				/**
				 * [int]
				 */
				total_count: number;
			}[];

			return movies;

			/* console.log(movies);

			const pageCounts = parseInt(res.headers.get('x-pagination-page-count') ?? '0');

			for (let i = 1; i < pageCounts; i++) {
				url.searchParams.set('page', i.toString());

				movies.push(
					...((await (
						await this.fetch({
							url,
							token,
						})
					).json()) as {
						movie: MovieFull;
					}[]),
				);
			}

			console.log(movies.length);

			const uniqueIds = [
				...new Set(
					movies.map((movie) => {
						return movie.movie.ids.trakt;
					}),
				),
			];

			return uniqueIds.map((id) => {
				return movies.find((movie) => {
					return movie.movie.ids.trakt === id;
				});
			}); */
		},
		/**
		 * @see https://docs.trakt.tv/reference/getuserswatchedtyped
		 * @see https://docs.trakt.tv/reference/getuserswatchedminimalmovies
		 */
		getWatchedMoviesFull: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/watched/movies?extended=full`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			const movies = (await res.json()) as {
				/**
				 * [date]
				 */
				last_updated_at: string;
				/**
				 * [date]
				 */
				last_watched_at: string;
				movie: Movie;
				/**
				 * [int]
				 */
				total_count: number;
			}[];

			return movies;
		},

		/**
		 * @see https://docs.trakt.tv/reference/getuserswatchedminimalshows
		 */
		getWatchedShows: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: string;
			userId?: UserId;
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/watched/shows`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				// ...
				show: Show;
			}[];
		},
		/**
		 * @see https://docs.trakt.tv/reference/getuserswatchedminimalshows
		 */
		getWatchedShowsFull: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/watched/shows?extended=full`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				// ...
				show: Show;
			}[];
		},

		/**
		 * @see https://docs.trakt.tv/reference/getusersfavoritestypedsorted
		 * @see https://docs.trakt.tv/reference/getusersfavoritesmovies
		 */
		getFavouriteMovies: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			page?: number;
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/favorites/movies`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [int]
				 */
				id: number;
				/**
				 * [int]
				 */
				rank: number;
				/**
				 * [date]
				 */
				listed_at: string;
				notes: null | string;
				/**
				 * [int]
				 */
				my_rating: null | number;
				type: 'movie';
				movie: Movie;
			}[];
		},
		/**
		 * @see https://docs.trakt.tv/reference/getusersfavoritestypedsorted
		 * @see https://docs.trakt.tv/reference/getusersfavoritesmovies
		 */
		getFavouriteMoviesFull: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			page?: number;
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/favorites/movies?extended=full`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [int]
				 */
				id: number;
				/**
				 * [int]
				 */
				rank: number;
				/**
				 * [date]
				 */
				listed_at: string;
				notes: null | string;
				/**
				 * [int]
				 */
				my_rating: null | number;
				type: 'movie';
				movie: MovieFull;
			}[];
		},

		/**
		 * @see https://docs.trakt.tv/reference/getusersfavoritestypedsorted
		 * @see https://docs.trakt.tv/reference/getusersfavoritesshows
		 */
		getFavouriteShows: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/favorites/shows`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [int]
				 */
				id: number;
				/**
				 * [int]
				 */
				rank: number;
				/**
				 * [date]
				 */
				listed_at: string;
				notes: null | string;
				/**
				 * [int]
				 */
				my_rating: null | number;
				type: 'show';
				show: Show;
			}[];
		},
		/**
		 * @see https://docs.trakt.tv/reference/getusersfavoritestypedsorted
		 * @see https://docs.trakt.tv/reference/getusersfavoritesshows
		 */
		getFavouriteShowsFull: async ({
			token,
			userId = 'me',
			page,
			limit,
		}: {
			token: Token;
			userId?: UserId;
			/**
			 * [int]
			 */
			page?: number;
			/**
			 * [int]
			 */
			limit?: number;
		}) => {
			const url = new URL(`${this.apiOrigin}/users/${userId}/favorites/shows?extended=full`);

			if (page) {
				url.searchParams.append('page', page.toString());
			}
			if (limit) {
				url.searchParams.append('limit', limit.toString());
			}

			const res = await this.fetch({
				url,
				token,
			});

			return (await res.json()) as {
				/**
				 * [int]
				 */
				id: number;
				/**
				 * [int]
				 */
				rank: number;
				/**
				 * [date]
				 */
				listed_at: string;
				notes: null | string;
				/**
				 * [int]
				 */
				my_rating: null | number;
				type: 'show';
				show: ShowFull;
			}[];
		},

		// ...
	};

	// lists = {};
	// sync = {};
	// recommendations = {};
	// movies = {};
	// shows = {};
	// socialRecommendations = {};
	// media = {};
	// notes = {};
	// search = {};
	// people = {};
	// watchNow = {};
	// seasons = {};
	// episodes = {};
	// smartList = {};
	// comments = {};
	// certifications = {};
	// countries = {};
	// genres = {};
	// languages = {};
	// networks = {};
	// scrobble = {};
	// team = {};
	// younify = {};
}
