import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: any;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type SvModuleProps = typeof __propDef.props;
export type SvModuleEvents = typeof __propDef.events;
export type SvModuleSlots = typeof __propDef.slots;
export default class SvModule extends SvelteComponentTyped<
	SvModuleProps,
	SvModuleEvents,
	SvModuleSlots
> {}
export {};
