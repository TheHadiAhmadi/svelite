import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        data: unknown;
        collection?: string | undefined;
        columns?: unknown;
        actions?: unknown;
    };
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
