import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		items?: unknown;
		multiple?: boolean | undefined;
		placeholder?: unknown;
		key?: string | undefined;
		text?: string | undefined;
		value: unknown;
	} & Record<string, unknown>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponentTyped<SelectProps, SelectEvents, SelectSlots> {}
export {};
