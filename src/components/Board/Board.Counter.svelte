<script>
	import { currentArtistIndex } from "$stores/misc";

	export let maxArtistIndex;
</script>

<p class="count title-font">{$currentArtistIndex + 1} of {maxArtistIndex}</p>

<style lang="scss">
	.count {
		font-family: var(--title);
		color: rgba(120, 120, 120, 1);
		font-size: 30px;
		margin: 0;
		font-weight: 500;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		margin-bottom: 20px;
		margin-left: 2px;
		flex-shrink: 0;

		@media only screen and (max-width: 600px) {
			margin-bottom: 10px;
		}
	}
</style>
