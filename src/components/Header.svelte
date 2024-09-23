<script>
	import wordmark from "$svg/wordmark.svg";
	import { onMount } from "svelte";

	let headerElement;

	onMount(() => {
		const headerHeight = headerElement.offsetHeight;
		document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
	});
</script>

<header bind:this={headerElement}>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>
</header>

<style>
	.wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}
</style>
