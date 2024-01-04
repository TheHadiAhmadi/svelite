export function form(fields: any[], actions: any[] = [], submit: any, load = '') {
	return {
		name: 'Form',
		props: {
			fields,
			actions,
			submit,
			load
		}
	};
}

export function page(title = 'page', actions: any[] = [], content: any[] = []) {
	return {
		name: 'Page',
		props: {
			title,
			actions,
			content
		}
	};
}

export function table(collection = '', columns: any[] = [], actions: any[] = []) {
	return {
		name: 'Table',
		props: {
			collection,
			columns,
			actions
		}
	};
}


