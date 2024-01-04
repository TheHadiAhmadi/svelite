/** @typedef {typeof __propDef.props}  AuthLayoutProps */
/** @typedef {typeof __propDef.events}  AuthLayoutEvents */
/** @typedef {typeof __propDef.slots}  AuthLayoutSlots */
export default class AuthLayout extends SvelteComponentTyped<{
    children: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AuthLayoutProps = typeof __propDef.props;
export type AuthLayoutEvents = typeof __propDef.events;
export type AuthLayoutSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        children: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
