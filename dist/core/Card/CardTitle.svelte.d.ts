/** @typedef {typeof __propDef.props}  CardTitleProps */
/** @typedef {typeof __propDef.events}  CardTitleEvents */
/** @typedef {typeof __propDef.slots}  CardTitleSlots */
export default class CardTitle extends SvelteComponentTyped<
	{
		[x: string]: unknown;
		children: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type CardTitleProps = typeof __propDef.props;
export type CardTitleEvents = typeof __propDef.events;
export type CardTitleSlots = typeof __propDef.slots;
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
