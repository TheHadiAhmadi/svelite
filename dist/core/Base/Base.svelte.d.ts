import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        tag?: string | undefined;
        children: unknown;
        klass?: string | undefined;
        classes: unknown;
    } & Record<string, unknown>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BaseProps = typeof __propDef.props;
export type BaseEvents = typeof __propDef.events;
export type BaseSlots = typeof __propDef.slots;
export default class Base extends SvelteComponent<BaseProps, BaseEvents, BaseSlots> {
}
export {};
