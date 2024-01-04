import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		children: unknown;
		body: unknown;
		header: unknown;
		title: unknown;
	} & Record<string, unknown>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type CardProps = typeof __propDef.props;
export type CardEvents = typeof __propDef.events;
export type CardSlots = typeof __propDef.slots;
export default class Card extends SvelteComponentTyped<CardProps, CardEvents, CardSlots> {}
export {};
