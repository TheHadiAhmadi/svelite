## CLI

npx svelite pack => build lib (plugins)
npx svelite preview => cd dist && node index.js

## normalize slug and complete matchRoutes function

## write readme


## Typescript types
```ts
export type FileManagementConfig = {};
export type ContentManagementConfig = {};
export type ContentTypeManagementConfig = {};

export type ModuleProp = { [x: string]: any };

export type ModuleType = {
	name: string;
	component: any;
	description?: string;
	load?: any;
	props?: ModuleProp;
};

export type PageModule = {
	name: string;
	props: any;
};

export type SvelitePage = {
	slug: string;
	modules: PageModule[];
	layout?: PageModule;
	title?: string;
};

export type SvelitePlugin = {
	modules?: Record<string, ModuleType>;
	layouts?: Record<string, ModuleType>;
	pages?: SvelitePage[];
};

export type SveliteConfig = {
	plugins?: SvelitePlugin[];
	api?: string;
	modules?: Record<string, ModuleType>;
	layouts?: Record<string, ModuleType>;
	pages?: SvelitePage[];
	// more...
};

```


## Match route

```ts
function matchRoute(url, pages) {

    const staticPages = pages.filter(x => !x.slug.includes('{'))
    const dynamicPages = pages.filter(x => x.slug.includes('{') && !x.slug.includes('{...'))
    const restPages = pages.filter(x => x.slug.includes('{...'))

	let result: any = {};

    for(let page of staticPages) {
		if (url === page.slug)
			result = {
				page,
				params: {}
			};
    }
    if(result.page) return result;

	for (let page of dynamicPages) {

		const urlSplitted = url.split('/');
		const slugSplitted = page.slug?.split('/');
		// match dynamic..
		//
		if (!urlSplitted.length === slugSplitted) result = {};

		let params: any = {};
		for (let index in slugSplitted) {
            if(urlSplitted[index] === slugSplitted[index])
                continue;

            // check if slugSplitted is dynamic
            if (slugSplitted[index].startsWith('{')) {
                result.page = page;
                params[slugSplitted[index].slice(1, slugSplitted[index].length - 1)] = urlSplitted[index];
                result.params = params;
                break;
            } else {
                break;
            }
		}
    }
    if(result.page) return result;

	for (let page of restPages) {

		const urlSplitted = url.split('/');
		const slugSplitted = page.slug?.split('/');
		// match dynamic..
		//
		if (!urlSplitted.length === slugSplitted) result = {};

		let params: any = {};
		for (let index in slugSplitted) {
            
			if (urlSplitted[index] !== slugSplitted[index]) {
				// check if slugSplitted is dynamic
				if (slugSplitted[index]?.startsWith('{...')) {
					result.page = page;

					params[slugSplitted[index].slice(4, slugSplitted[index].length - 1)] = urlSplitted
						.slice(index)
						.join('/');
					result.params = params;

					break;
				}
			} else {
				continue;
			}
		}

		// if (result.page) return result;
	}

	return result;
}

```

## app.html

```html

<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>

```

## Layout client side routing 
in client side routing we should not load layout's data if layout is same as previous layout. also don't load data if page is same.

Write something like cachedLoad, which first find page based on pathname, then check if we can use previously cached data. (also support invalidate prop which can force load data).


## Move routing related codes to another file. (Cleanup SvLayout component)

## Move SV_LAYOUT Context contents to somewhere else. (importable)
```svelte
<script>
	import {goto, navigating, reload} from '$app'

</script>
```