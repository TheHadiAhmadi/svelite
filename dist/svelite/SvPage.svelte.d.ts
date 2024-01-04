/** @typedef {typeof __propDef.props}  SvPageProps */
/** @typedef {typeof __propDef.events}  SvPageEvents */
/** @typedef {typeof __propDef.slots}  SvPageSlots */
export default class SvPage extends SvelteComponentTyped<
	{
		data: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type SvPageProps = typeof __propDef.props;
export type SvPageEvents = typeof __propDef.events;
export type SvPageSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		data: unknown;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
