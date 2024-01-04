/** @typedef {typeof __propDef.props}  ModalBodyProps */
/** @typedef {typeof __propDef.events}  ModalBodyEvents */
/** @typedef {typeof __propDef.slots}  ModalBodySlots */
export default class ModalBody extends SvelteComponentTyped<
	{
		[x: string]: unknown;
		children: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type ModalBodyProps = typeof __propDef.props;
export type ModalBodyEvents = typeof __propDef.events;
export type ModalBodySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: unknown;
		children: unknown;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
