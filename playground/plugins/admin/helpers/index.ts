export function form(fields: any[], actions: any[] = [], submit: any, load = '', goBack = false, tabs = []) {
	return {
		name: 'Form',
		props: {
			fields,
			actions,
			submit,
			load,
            tabs,
            goBack
		}
	};
}

export function page({title, actions, content, hasBack} = {}) {
	return {
		name: 'Page',
		props: {
			title: title ?? 'Page',
			actions: actions ?? [],
			content: content ?? [],
            hasBack: hasBack ?? false
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


