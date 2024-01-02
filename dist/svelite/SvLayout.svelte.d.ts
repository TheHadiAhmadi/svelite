/** @typedef {typeof __propDef.props}  SvLayoutProps */
/** @typedef {typeof __propDef.events}  SvLayoutEvents */
/** @typedef {typeof __propDef.slots}  SvLayoutSlots */
export default class SvLayout extends SvelteComponentTyped<{
    [x: string]: unknown;
    children: unknown;
    data: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SvLayoutProps = typeof __propDef.props;
export type SvLayoutEvents = typeof __propDef.events;
export type SvLayoutSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        children: unknown;
        data: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
