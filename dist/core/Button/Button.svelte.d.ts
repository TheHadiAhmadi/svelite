import { SvelteComponentTyped } from "svelte";
import './button.css';
declare const __propDef: {
    props: {
        children: unknown;
        ghost?: boolean | undefined;
        icon?: boolean | undefined;
        color?: string | undefined;
        size?: string | undefined;
        onclick: unknown;
        href: unknown;
    } & Record<string, unknown>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
