<script>
	export let text = "Next";
	export let onClick = () => {};
	export let fixed = true;
	export let fontSize = "80px";
	import viewport from "$stores/viewport";
	import { multiplyCssValue } from "$utils/multiplyCssValue";
</script>

<button
	on:click={onClick}
	class:fixed
	style:--font-size={multiplyCssValue(fontSize, $viewport.width > 800 ? 1 : 0.5)}
>
	{text}
</button>

<style lang="scss">
	button {
		font-size: var(--font-size);
		font-family: var(--title);
		padding: 1rem 3rem 0.5rem;
		font-weight: bold;
		border: none;
		background-color: var(--color-pink);
		color: #000;
		border-radius: 3px;
		cursor: pointer;
		transition: background-color 0.3s;
		transition: transform 0.5s;
		width: fit-content;
		touch-action: manipulation;

		@media only screen and (max-width: 600px) {
			padding: 0.5rem 2rem 0;
		}

		&.fixed {
			position: fixed;
			right: 2rem;
			bottom: 100px;

			@media only screen and (max-width: 600px) {
				bottom: 30px;
			}
		}
	}
	@media (hover: hover) and (pointer: fine) {
		button:hover {
			transform: scale(1.1);
		}
	}
</style>
