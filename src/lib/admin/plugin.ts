import modules from './modules';
import layouts from './layouts';
import PageModules from './components/PageModules.svelte';

function getAdminPages(config: any) {
	const adminPrefix = config.adminPrefix ?? 'admin';
	const authPrefix = config.authPrefix ?? 'auth';

	const hasContentManagement = config.contentManagement !== false;
	const hasContentTypeManagement = config.contentTypeManagement !== false;
	const hasPageManagement = config.pageManagement !== false;
	const hasAuthPages = config.authPages !== false;
	const hasDashboard = config.dashboard !== false;
	const collections = config.collections ?? [];

	let adminLayout = {
		name: 'AdminLayout',
		props: {
			theme: 'light',
			dir: 'ltr',
			sidebar: [{ title: 'Home', href: '/admin', icon: 'home' }]
		}
	};

	let pages: any[] = [];

	if (hasContentTypeManagement) {
		// build dynamic tables (collections + custom tables)...
		// and dynamic routes for
	}

	function form(fields: any[], actions: any[] = [], submit: any, load = '') {
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

	if (hasContentManagement) {
		// crud for tables (collections)...
		for (let collection of collections) {
			console.log(collection);

			// sidebar item
			//
			// CRUD page

			adminLayout.props.sidebar.push({
				icon: 'database',
				href: '/admin/content/' + collection.slug,
				title: collection.name
			});

			const collectionFormFields = collection.fields.map((x) => ({ label: x.name, ...x }));

			const collectionTableFields = collection.fields.map((x) => {
				x.field ??= x.name;

				if (x.type === 'plain_text') {
					x.type = 'text';
				}

				if (x.type === 'select') {
					x.type = 'badge';
				}

				return x;
			});

			const contentListPage = {
				slug: 'admin/content/' + collection.slug,
				title: collection.name,
				layout: adminLayout,
				modules: [
					page(
						collection.name,
						[
							{
								text: 'Add New Item',
								color: 'primary',
								icon: 'plus',
								href: '/admin/content/' + collection.slug + '/create'
							}
						],
						[
							table(collection.slug, collectionTableFields, [
								'remove',
								{
									color: 'primary',
									icon: 'edit',
									href: '/admin/content/' + collection.slug + '/{id}'
								}
							])
						]
					)
				]
			};

			const contentCreatePage = {
				slug: 'admin/content/' + collection.slug + '/create',
				title: 'Add ' + collection.name,
				layout: adminLayout,
				modules: [
					page(
						'Add ' + collection.name,
						['back'],
						[
							form(collectionFormFields, ['cancel'], {
								color: 'primray',
								action: collection.slug + ':insert',
								text: 'Create'
							})
						]
					)
				]
			};
			const contentUpdatePage = {
				slug: 'admin/content/' + collection.slug + '/{id}',
				title: 'Update ' + collection.name,
				layout: adminLayout,
				modules: [
					page(
						'Update ' + collection.name,
						['back'],
						[
							form(
								collectionFormFields,
								['cancel'],
								{
									color: 'primray',
									action: collection.slug + ':update',
									text: 'Update'
								},
								collection.slug + ':id:=:id'
							)
						]
					)
				]
			};
			pages.push(contentListPage);
			pages.push(contentCreatePage);
			pages.push(contentUpdatePage);
		}
	}

	function page(title = 'page', actions: any[] = [], content: any[] = []) {
		return {
			name: 'Page',
			props: {
				title,
				actions,
				content
			}
		};
	}

	function table(collection = '', columns: any[] = [], actions: any[] = []) {
		return {
			name: 'Table',
			props: {
				collection,
				columns,
				actions
			}
		};
	}

	if (hasPageManagement) {
		// /admin/files routes and upload/edit/remove from admin panel
		const listPage = {
			slug: adminPrefix + '/pages',
			layout: adminLayout,
			modules: [
				page(
					'Page List',
					[
						{
							text: 'Create Page',
							color: 'primary',
							icon: 'plus',
							href: '/' + adminPrefix + '/pages/create'
						}
					],
					[
						table(
							'pages',
							[
								{ type: 'text', name: 'Title', field: 'title' },
								{ type: 'text', name: 'Slug', field: 'slug' }
							],
							[
								'remove',
								{ href: '/admin/pages/{id}', icon: 'edit' },
								{ icon: 'external-link', color: 'success', href: '/{slug}' }
							]
						)
					]
				)
			]
		};

		const pageFormFields = [
			{
				name: 'title',
				label: 'Title',
				type: 'plain_text'
			},
			{
				name: 'slug',
				label: 'Slug',
				type: 'plain_text'
			},
			{
				name: 'modules',
				label: 'Modules',
				type: 'custom',
				component: PageModules,
				props: {
					modules
				}
			}
		];

		const createPage = {
			slug: adminPrefix + '/pages/create',
			layout: adminLayout,
			modules: [
				page(
					'Create Page',
					['back'],
					[
						form(pageFormFields, ['cancel'], {
							color: 'primray',
							action: 'pages:insert',
							text: 'Create'
						})
					]
				)
			]
		};

		const editPage = {
			title: 'Edit Page',
			slug: 'admin/pages/{id}',
			layout: adminLayout,
			modules: [
				page(
					'Edit Page',
					['back'],
					[
						form(
							pageFormFields,
							['cancel'],
							{
								color: 'primray',
								action: 'pages:update',
								text: 'Update'
							},
							'pages:id:=:id'
						)
					]
				)
			]
		};

		pages.push(listPage);
		pages.push(createPage);
		pages.push(editPage);

		adminLayout.props.sidebar.push({ icon: 'file', title: 'Pages', href: '/admin/pages' });
	}

	if (hasAuthPages) {
		const loginPage = {
			slug: authPrefix + '/login',
			title: 'Login',
			layout: { name: 'AuthLayout', props: {} },
			modules: [{ name: 'Login', props: {} }]
		};
		console.log({ authPrefix });
		pages.push(loginPage);
		// /auth/login
		// /auth/register
		// /auth/forgot
		adminLayout.props.sidebar.push({ icon: 'logout', title: 'Logout', href: '/auth/logout' });
	}

	if (hasDashboard) {
		// /admin route
	}

	pages.push({});

	return pages;
}

export function AdminPanelPlugin(config: any) {
	const pages = getAdminPages(config);

	return {
		modules,
		pages,
		layouts
	};
}
