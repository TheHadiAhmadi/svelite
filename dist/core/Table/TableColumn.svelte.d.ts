import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        name: unknown;
        width?: string | undefined;
        children: unknown;
    } & Record<string, unknown>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TableColumnProps = typeof __propDef.props;
export type TableColumnEvents = typeof __propDef.events;
export type TableColumnSlots = typeof __propDef.slots;
export default class TableColumn extends SvelteComponentTyped<TableColumnProps, TableColumnEvents, TableColumnSlots> {
}
export {};
