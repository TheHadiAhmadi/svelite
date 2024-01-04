import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		data: any;
		form: any;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PageProps = typeof __propDef.props;
export type PageEvents = typeof __propDef.events;
export type PageSlots = typeof __propDef.slots;
export default class Page extends SvelteComponentTyped<PageProps, PageEvents, PageSlots> {}
export {};
