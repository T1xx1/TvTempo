import { redirect } from '@sveltejs/kit';

export const auth = {
	isUser: (locals: App.Locals): boolean => {
		return locals.token !== null;
	},
	user: (locals: App.Locals): never | string => {
		if (locals.token === null) {
			throw redirect(302, '/auth');
		}

		return locals.token;
	},
};
