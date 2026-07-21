export type Token = string;

export type Tokens = {
	access_token: Token;
	token_type: 'Bearer';
	/**
	 * [s]
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

// #region
export type Country =
	| 'af'
	| 'al'
	| 'dz'
	| 'as'
	| 'ad'
	| 'ao'
	| 'ai'
	| 'aq'
	| 'ag'
	| 'ar'
	| 'am'
	| 'aw'
	| 'au'
	| 'at'
	| 'az'
	| 'bs'
	| 'bh'
	| 'bd'
	| 'bb'
	| 'by'
	| 'be'
	| 'bz'
	| 'bj'
	| 'bm'
	| 'bt'
	| 'bo'
	| 'ba'
	| 'bw'
	| 'br'
	| 'io'
	| 'bn'
	| 'bg'
	| 'bf'
	| 'bi'
	| 'cv'
	| 'kh'
	| 'cm'
	| 'ca'
	| 'ky'
	| 'cf'
	| 'td'
	| 'cl'
	| 'cn'
	| 'co'
	| 'km'
	| 'cg'
	| 'cd'
	| 'ck'
	| 'cr'
	| 'hr'
	| 'cu'
	| 'cy'
	| 'cz'
	| 'ci'
	| 'dk'
	| 'dj'
	| 'dm'
	| 'do'
	| 'ec'
	| 'eg'
	| 'sv'
	| 'gq'
	| 'er'
	| 'ee'
	| 'sz'
	| 'et'
	| 'fk'
	| 'fo'
	| 'fj'
	| 'fi'
	| 'fr'
	| 'gf'
	| 'pf'
	| 'tf'
	| 'ga'
	| 'gm'
	| 'ge'
	| 'de'
	| 'gh'
	| 'gi'
	| 'gr'
	| 'gl'
	| 'gd'
	| 'gp'
	| 'gu'
	| 'gt'
	| 'gn'
	| 'gw'
	| 'gy'
	| 'ht'
	| 'va'
	| 'hn'
	| 'hk'
	| 'hu'
	| 'is'
	| 'in'
	| 'id'
	| 'ir'
	| 'iq'
	| 'ie'
	| 'il'
	| 'it'
	| 'jm'
	| 'jp'
	| 'jo'
	| 'kz'
	| 'ke'
	| 'ki'
	| 'kp'
	| 'kr'
	| 'kw'
	| 'kg'
	| 'la'
	| 'lv'
	| 'lb'
	| 'ls'
	| 'lr'
	| 'ly'
	| 'li'
	| 'lt'
	| 'lu'
	| 'mo'
	| 'mg'
	| 'mw'
	| 'my'
	| 'mv'
	| 'ml'
	| 'mt'
	| 'mh'
	| 'mq'
	| 'mr'
	| 'mu'
	| 'yt'
	| 'mx'
	| 'fm'
	| 'md'
	| 'mc'
	| 'mn'
	| 'me'
	| 'ms'
	| 'ma'
	| 'mz'
	| 'mm'
	| 'na'
	| 'nr'
	| 'np'
	| 'nl'
	| 'nc'
	| 'nz'
	| 'ni'
	| 'ne'
	| 'ng'
	| 'nu'
	| 'mk'
	| 'mp'
	| 'no'
	| 'om'
	| 'pk'
	| 'pw'
	| 'ps'
	| 'pa'
	| 'pg'
	| 'py'
	| 'pe'
	| 'ph'
	| 'pn'
	| 'pl'
	| 'pt'
	| 'pr'
	| 'qa'
	| 'ro'
	| 'ru'
	| 'rw'
	| 're'
	| 'sh'
	| 'kn'
	| 'lc'
	| 'vc'
	| 'ws'
	| 'sm'
	| 'st'
	| 'sa'
	| 'sn'
	| 'rs'
	| 'sc'
	| 'sl'
	| 'sg'
	| 'sk'
	| 'si'
	| 'sb'
	| 'so'
	| 'za'
	| 'gs'
	| 'ss'
	| 'es'
	| 'lk'
	| 'sd'
	| 'sr'
	| 'sj'
	| 'se'
	| 'ch'
	| 'sy'
	| 'tw'
	| 'tj'
	| 'tz'
	| 'th'
	| 'tl'
	| 'tg'
	| 'to'
	| 'tt'
	| 'tn'
	| 'tr'
	| 'tm'
	| 'tc'
	| 'tv'
	| 'ug'
	| 'ua'
	| 'ae'
	| 'gb'
	| 'us'
	| 'um'
	| 'uy'
	| 'uz'
	| 'vu'
	| 've'
	| 'vn'
	| 'vg'
	| 'vi'
	| 'eh'
	| 'ye'
	| 'zm'
	| 'zw';
// #endregion

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

// #region
export type Language =
	| 'ab'
	| 'aa'
	| 'af'
	| 'ak'
	| 'sq'
	| 'am'
	| 'ar'
	| 'hy'
	| 'as'
	| 'av'
	| 'ay'
	| 'az'
	| 'bm'
	| 'ba'
	| 'eu'
	| 'be'
	| 'bn'
	| 'bi'
	| 'nb'
	| 'bs'
	| 'br'
	| 'bg'
	| 'my'
	| 'ca'
	| 'km'
	| 'ch'
	| 'ce'
	| 'ny'
	| 'zh'
	| 'cu'
	| 'cv'
	| 'kw'
	| 'co'
	| 'cr'
	| 'hr'
	| 'cs'
	| 'da'
	| 'dv'
	| 'nl'
	| 'dz'
	| 'en'
	| 'eo'
	| 'et'
	| 'ee'
	| 'fo'
	| 'fj'
	| 'fi'
	| 'fr'
	| 'ff'
	| 'gd'
	| 'gl'
	| 'lg'
	| 'ka'
	| 'de'
	| 'el'
	| 'gn'
	| 'gu'
	| 'ht'
	| 'ha'
	| 'he'
	| 'hz'
	| 'hi'
	| 'ho'
	| 'hu'
	| 'is'
	| 'ig'
	| 'id'
	| 'iu'
	| 'ik'
	| 'ga'
	| 'it'
	| 'ja'
	| 'jv'
	| 'kl'
	| 'kn'
	| 'ks'
	| 'kk'
	| 'ki'
	| 'rw'
	| 'ky'
	| 'kg'
	| 'ko'
	| 'ku'
	| 'lo'
	| 'la'
	| 'lv'
	| 'li'
	| 'ln'
	| 'lt'
	| 'lu'
	| 'lb'
	| 'mk'
	| 'mg'
	| 'ms'
	| 'ml'
	| 'mt'
	| 'gv'
	| 'mi'
	| 'mr'
	| 'mh'
	| 'mn'
	| 'nv'
	| 'nd'
	| 'nr'
	| 'ne'
	| 'se'
	| 'no'
	| 'nn'
	| 'oc'
	| 'oj'
	| 'or'
	| 'om'
	| 'os'
	| 'pi'
	| 'pa'
	| 'fa'
	| 'pl'
	| 'pt'
	| 'ps'
	| 'qu'
	| 'ro'
	| 'rm'
	| 'rn'
	| 'ru'
	| 'sm'
	| 'sg'
	| 'sa'
	| 'sc'
	| 'sr'
	| 'sn'
	| 'ii'
	| 'sd'
	| 'si'
	| 'sk'
	| 'sl'
	| 'so'
	| 'st'
	| 'es'
	| 'su'
	| 'sw'
	| 'ss'
	| 'sv'
	| 'tl'
	| 'ty'
	| 'tg'
	| 'ta'
	| 'tt'
	| 'te'
	| 'th'
	| 'bo'
	| 'ti'
	| 'to'
	| 'ts'
	| 'tn'
	| 'tr'
	| 'tk'
	| 'tw'
	| 'ug'
	| 'uk'
	| 'ur'
	| 'uz'
	| 've'
	| 'vi'
	| 'cy'
	| 'fy'
	| 'wo'
	| 'xh'
	| 'yi'
	| 'yo'
	| 'zu';
// #endregion

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
