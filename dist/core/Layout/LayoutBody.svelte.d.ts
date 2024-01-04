/** @typedef {typeof __propDef.props}  LayoutBodyProps */
/** @typedef {typeof __propDef.events}  LayoutBodyEvents */
/** @typedef {typeof __propDef.slots}  LayoutBodySlots */
export default class LayoutBody extends SvelteComponentTyped<
	{
		[x: string]: unknown;
		children: unknown;
		hasSidebar: unknown;
		hasHeader: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type LayoutBodyProps = typeof __propDef.props;
export type LayoutBodyEvents = typeof __propDef.events;
export type LayoutBodySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: unknown;
		children: unknown;
		hasSidebar: unknown;
		hasHeader: unknown;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
