import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        items?: unknown;
        row: unknown;
    } & Record<string, unknown>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TableProps = typeof __propDef.props;
export type TableEvents = typeof __propDef.events;
export type TableSlots = typeof __propDef.slots;
export default class Table extends SvelteComponentTyped<TableProps, TableEvents, TableSlots> {
}
export {};
