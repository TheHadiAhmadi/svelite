/** @typedef {typeof __propDef.props}  SvSlotProps */
/** @typedef {typeof __propDef.events}  SvSlotEvents */
/** @typedef {typeof __propDef.slots}  SvSlotSlots */
export default class SvSlot extends SvelteComponentTyped<
	{
		slot?: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type SvSlotProps = typeof __propDef.props;
export type SvSlotEvents = typeof __propDef.events;
export type SvSlotSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		slot?: unknown;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
