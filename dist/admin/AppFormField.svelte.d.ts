/** @typedef {typeof __propDef.props}  AppFormFieldProps */
/** @typedef {typeof __propDef.events}  AppFormFieldEvents */
/** @typedef {typeof __propDef.slots}  AppFormFieldSlots */
export default class AppFormField extends SvelteComponentTyped<{
    [x: string]: unknown;
    field: unknown;
    value: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AppFormFieldProps = typeof __propDef.props;
export type AppFormFieldEvents = typeof __propDef.events;
export type AppFormFieldSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: unknown;
        field: unknown;
        value: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
