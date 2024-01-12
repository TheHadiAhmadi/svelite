/** @typedef {typeof __propDef.props}  SidebarItemProps */
/** @typedef {typeof __propDef.events}  SidebarItemEvents */
/** @typedef {typeof __propDef.slots}  SidebarItemSlots */
export default class SidebarItem extends SvelteComponent<{
    [x: string]: unknown;
    title: unknown;
    href: unknown;
    active: unknown;
    level?: number | undefined;
    icon: unknown;
    children: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SidebarItemProps = typeof __propDef.props;
export type SidebarItemEvents = typeof __propDef.events;
export type SidebarItemSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        title: unknown;
        href: unknown;
        active: unknown;
        level?: number | undefined;
        icon: unknown;
        children: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
