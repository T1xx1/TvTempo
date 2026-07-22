import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { mediaType, slug } = params;

	return {
		mediaType,
		slug,
	};
};
