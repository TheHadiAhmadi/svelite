/** @typedef {typeof __propDef.props}  CardHeaderProps */
/** @typedef {typeof __propDef.events}  CardHeaderEvents */
/** @typedef {typeof __propDef.slots}  CardHeaderSlots */
export default class CardHeader extends SvelteComponent<{
    [x: string]: unknown;
    children: unknown;
    title: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CardHeaderProps = typeof __propDef.props;
export type CardHeaderEvents = typeof __propDef.events;
export type CardHeaderSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        children: unknown;
        title: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
