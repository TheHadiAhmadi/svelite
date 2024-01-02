/** @typedef {typeof __propDef.props}  TodosProps */
/** @typedef {typeof __propDef.events}  TodosEvents */
/** @typedef {typeof __propDef.slots}  TodosSlots */
export default class Todos extends SvelteComponentTyped<{
    data: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type TodosProps = typeof __propDef.props;
export type TodosEvents = typeof __propDef.events;
export type TodosSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        data: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
