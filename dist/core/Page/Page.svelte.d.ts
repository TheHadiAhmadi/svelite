/** @typedef {typeof __propDef.props}  PageProps */
/** @typedef {typeof __propDef.events}  PageEvents */
/** @typedef {typeof __propDef.slots}  PageSlots */
export default class Page extends SvelteComponentTyped<
	{
		[x: string]: unknown;
		title?: string | undefined;
		actions: unknown;
		children: unknown;
		container?: boolean | undefined;
		theme?: string | undefined;
		dir?: string | undefined;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type PageProps = typeof __propDef.props;
export type PageEvents = typeof __propDef.events;
export type PageSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: unknown;
		title?: string | undefined;
		actions: unknown;
		children: unknown;
		container?: boolean | undefined;
		theme?: string | undefined;
		dir?: string | undefined;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
