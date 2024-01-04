export declare function createSveliteLoad(
	api: any,
	pages: any,
	modules: any,
	layouts: any
): (slug: string) => Promise<
	| {
			page?: undefined;
			modules?: undefined;
	  }
	| {
			page: any;
			modules: any;
	  }
>;
