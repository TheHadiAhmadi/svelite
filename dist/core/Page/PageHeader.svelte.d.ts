/** @typedef {typeof __propDef.props}  PageHeaderProps */
/** @typedef {typeof __propDef.events}  PageHeaderEvents */
/** @typedef {typeof __propDef.slots}  PageHeaderSlots */
export default class PageHeader extends SvelteComponentTyped<
	{
		[x: string]: unknown;
		title?: string | undefined;
		children: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type PageHeaderProps = typeof __propDef.props;
export type PageHeaderEvents = typeof __propDef.events;
export type PageHeaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: unknown;
		title?: string | undefined;
		children: unknown;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
