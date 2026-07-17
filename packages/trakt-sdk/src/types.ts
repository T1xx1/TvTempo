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
	/**
	 * [date]
	 */
	created_at: number;
};

/**
 * [int]
 */
export type UserId = 'me' | number;

export type Extended = null | 'min' | 'full';

/*  */

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
/**
 * @deprecated User `UserFull` instead
 */
export type UserImages = User & {
	images: {
		avatar: {
			/**
			 * [url]
			 */
			full: string;
		};
	};
};
export type UserFull = UserImages & {
	/**
	 * [date]
	 */
	joined_at: null | string;
	location: null | string;
	about: null | string;
	gender: null | 'male' | 'female';
	/**
	 * [int]
	 */
	age: null | number;
	vip_og: null | boolean;
	/**
	 * [int]
	 */
	vip_years: null | number;
	/**
	 * [url]
	 */
	vip_cover_image: null | string;
};

/*  */

export type Ids = {
	/**
	 * [int]
	 */
	trakt: number;
	slug: string;
	imdb: null | string;
	/**
	 * [int]
	 */
	tmdb: null | number;
	plex: {
		guid: null | string;
		slug: null | string;
	};
};

export type Colors = {
	poster: `#${string}`[];
};

export type Country = 'us';

export type Images = {
	/**
	 * [url] Without https://
	 */
	fanart: string[];
	/**
	 * [url] Without https://
	 */
	poster: string[];
	/**
	 * [url] Without https://
	 */
	logo: string[];
	/**
	 * [url] Without https://
	 */
	clearart: string[];
	/**
	 * [url] Without https://
	 */
	banner: string[];
	/**
	 * [url] Without https://
	 */
	thumb: string[];
};

export type Language =
	| 'ar'
	| 'bg'
	| 'bs'
	| 'ca'
	| 'cs'
	| 'da'
	| 'de'
	| 'el'
	| 'en'
	| 'es'
	| 'et'
	| 'fa'
	| 'fi'
	| 'fr'
	| 'he'
	| 'hi'
	| 'hr'
	| 'hu'
	| 'hy'
	| 'id'
	| 'is'
	| 'it'
	| 'ja'
	| 'ka'
	| 'ko'
	| 'lt'
	| 'lv'
	| 'nl'
	| 'no'
	| 'pl'
	| 'pt'
	| 'ro'
	| 'ru'
	| 'sk'
	| 'sl'
	| 'sr'
	| 'sv'
	| 'th'
	| 'tr'
	| 'uk'
	| 'vi'
	| 'zh';

export type Status = 'released';

export type SocialIds = {
	twitter: null | string;
	facebook: null | string;
	instagram: null | string;
	wikipedia: null | string;
};

/*  */

export type Show = {
	title: string;
	/**
	 * [int]
	 */
	year: null | number;
	ids: Ids;
};
export type ShowFull = Show & {
	images: null | Images;
	/**
	 * [int]
	 */
	aired_episodes: null | number;
	tagline: null | string;
	overview: null | string;
	/**
	 * [date]
	 */
	first_aired: null | string;
	airs: null | {
		day: null | string;
		time: null | string;
		timezone: null | string;
	};
	/**
	 * [int]
	 */
	runtime: null | number;
	/**
	 * [int]
	 */
	total_runtime: number;
	certification: null | string;
	network: null | string;
	country: null | Country;
	status: null | Status;
	/**
	 * [float]
	 */
	rating: null | number;
	/**
	 * [int]
	 */
	votes: null | number;
	/**
	 * [int]
	 */
	comment_count: null | number;
	/**
	 * [url]
	 */
	trailer: null | string;
	/**
	 * [url]
	 */
	homepage: null | string;
	/**
	 * [date]
	 */
	updated_at: null | string;
	language: null | Language;
	languages: null | Language[];
	aviable_translations: null | Language[];
	genres: null | string[];
	subgenres: null | string[];
	original_title: null | string;
	colors: Colors;
	social_ids: null | SocialIds;
};

/*  */

export type Movie = {
	title: string;
	/**
	 * [int]
	 */
	year: null | number;
	ids: Ids;
};
export type MovieFull = Movie & {
	images: null | Images;
	tagline: null | string;
	overview: null | string;
	/**
	 * [date]
	 */
	released: null | string;
	/**
	 * [int]
	 */
	runtime: null | number;
	country: null | Country;
	status: null | Status;
	/**
	 * [float]
	 */
	rating: null | number;
	/**
	 * [int]
	 */
	votes: null | number;
	/**
	 * [int]
	 */
	comment_count: null | number;
	/**
	 * [url]
	 */
	trailer: null | string;
	/**
	 * [url]
	 */
	homepage: null | string;
	/**
	 * [date]
	 */
	updated_at: null | string;
	language: null | Language;
	languages: null | Language[];
	aviable_translations: null | Language[];
	genres: null | string[];
	subgenres: null | string[];
	certification: null | string;
	original_title: null | string;
	after_credits: null | boolean;
	during_credits: null | boolean;
	colors: Colors;
	social_ids: null | SocialIds;
};
