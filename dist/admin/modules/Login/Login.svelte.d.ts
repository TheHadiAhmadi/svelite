/** @typedef {typeof __propDef.props}  LoginProps */
/** @typedef {typeof __propDef.events}  LoginEvents */
/** @typedef {typeof __propDef.slots}  LoginSlots */
export default class Login extends SvelteComponentTyped<
	{
		data: unknown;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type LoginProps = typeof __propDef.props;
export type LoginEvents = typeof __propDef.events;
export type LoginSlots = typeof __propDef.slots;
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
