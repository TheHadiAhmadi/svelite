/** @typedef {typeof __propDef.props}  PageModulesProps */
/** @typedef {typeof __propDef.events}  PageModulesEvents */
/** @typedef {typeof __propDef.slots}  PageModulesSlots */
export default class PageModules extends SvelteComponentTyped<{
    [x: string]: unknown;
    value?: unknown;
    modules: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PageModulesProps = typeof __propDef.props;
export type PageModulesEvents = typeof __propDef.events;
export type PageModulesSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        value?: unknown;
        modules: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
