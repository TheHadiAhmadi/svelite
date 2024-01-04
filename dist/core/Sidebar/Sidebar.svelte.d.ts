/** @typedef {typeof __propDef.props}  SidebarProps */
/** @typedef {typeof __propDef.events}  SidebarEvents */
/** @typedef {typeof __propDef.slots}  SidebarSlots */
export default class Sidebar extends SvelteComponentTyped<
	{
		[x: string]: unknown;
		children: unknown;
		hasHeader: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type SidebarProps = typeof __propDef.props;
export type SidebarEvents = typeof __propDef.events;
export type SidebarSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: unknown;
		children: unknown;
		hasHeader: unknown;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
