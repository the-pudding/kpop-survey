<script>
	import wordmark from "$svg/wordmark.svg";
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	let headerElement;

	onMount(() => {
		const headerHeight = headerElement.offsetHeight;
		document.documentElement.style.setProperty(
			"--header-height",
			`${headerHeight}px`
		);
	});
</script>

<header bind:this={headerElement}>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self">
			<img src="{base}/assets/logo.png" />
		</a>
	</div>
</header>

<style lang="scss">
	header {
		z-index: 1000;
		position: relative;
	}
	.wordmark {
		max-width: 25em;
		margin: 0 auto;
		padding: 1em 0;

		@media only screen and (max-width: 600px) {
			max-width: 200px;
		}

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
