import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        data: unknown;
        load: unknown;
        goBack?: boolean | undefined;
        submit: unknown;
        fields: unknown;
        actions: unknown;
        params: unknown;
    } & Record<string, unknown>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FormProps = typeof __propDef.props;
export type FormEvents = typeof __propDef.events;
export type FormSlots = typeof __propDef.slots;
export default class Form extends SvelteComponentTyped<FormProps, FormEvents, FormSlots> {
}
export {};
