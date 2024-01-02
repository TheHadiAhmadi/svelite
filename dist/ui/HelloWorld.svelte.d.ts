/** @typedef {typeof __propDef.props}  HelloWorldProps */
/** @typedef {typeof __propDef.events}  HelloWorldEvents */
/** @typedef {typeof __propDef.slots}  HelloWorldSlots */
export default class HelloWorld extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type HelloWorldProps = typeof __propDef.props;
export type HelloWorldEvents = typeof __propDef.events;
export type HelloWorldSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
