/** @typedef {typeof __propDef.props}  CardBodyProps */
/** @typedef {typeof __propDef.events}  CardBodyEvents */
/** @typedef {typeof __propDef.slots}  CardBodySlots */
export default class CardBody extends SvelteComponentTyped<{
    [x: string]: unknown;
    children: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CardBodyProps = typeof __propDef.props;
export type CardBodyEvents = typeof __propDef.events;
export type CardBodySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        children: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
