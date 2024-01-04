<script>import Base from "../Base/Base.svelte";
import "./button.css";
let {
  children,
  ghost = false,
  icon = false,
  color = "default",
  size = "default",
  onclick,
  href,
  ...restProps
} = $props();
</script>

<Base
	{onclick}
	{href}
	classes="button button-color-{color} button-size-{size} {icon ? 'button-icon' : ''} {ghost
		? 'button-ghost'
		: ''}"
	tag={href ? 'a' : 'button'}
	{...restProps}
>
	{@render children()}
</Base>
