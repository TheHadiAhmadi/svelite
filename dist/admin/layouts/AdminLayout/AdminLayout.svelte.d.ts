/** @typedef {typeof __propDef.props}  AdminLayoutProps */
/** @typedef {typeof __propDef.events}  AdminLayoutEvents */
/** @typedef {typeof __propDef.slots}  AdminLayoutSlots */
export default class AdminLayout extends SvelteComponentTyped<{
    [x: string]: unknown;
    dir: unknown;
    theme: unknown;
    children: unknown;
    logo: unknown;
    sidebarItems?: unknown;
    data: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AdminLayoutProps = typeof __propDef.props;
export type AdminLayoutEvents = typeof __propDef.events;
export type AdminLayoutSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        dir: unknown;
        theme: unknown;
        children: unknown;
        logo: unknown;
        sidebarItems?: unknown;
        data: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
