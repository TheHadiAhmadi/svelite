type DBAdapter = {
	read: (collection: string) => Promise<any[]>;
	write: (collection: string, data: any[]) => Promise<void>;
};
export default function createSveliteDb(adapter: DBAdapter): (collectionName: string) => {
	find(): {
		filter: (
			field: string,
			operator: '=',
			value: any
		) => {
			filter: any;
			all: () => Promise<any>;
			first: () => Promise<any>;
			paginate: (page: number, perPage: number) => Promise<any>;
		};
		all: () => Promise<any>;
		first: () => Promise<any>;
		paginate: (page: number, perPage: number) => Promise<any>;
	};
	insert(data: any): Promise<any>;
	remove(id: string): Promise<void>;
	update(predicate: (value: any, index: number) => any, data: any): Promise<void>;
};
export declare const createMemoryAdapter: () => {
	read(collection: any): any;
	write(collection: any, value: any): void;
};
export {};
