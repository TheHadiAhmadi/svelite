/** @typedef {typeof __propDef.props}  OffcanvasProps */
/** @typedef {typeof __propDef.events}  OffcanvasEvents */
/** @typedef {typeof __propDef.slots}  OffcanvasSlots */
export default class Offcanvas extends SvelteComponentTyped<{
    [x: string]: unknown;
    open?: boolean | undefined;
    children: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type OffcanvasProps = typeof __propDef.props;
export type OffcanvasEvents = typeof __propDef.events;
export type OffcanvasSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        open?: boolean | undefined;
        children: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
