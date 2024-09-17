<script>
	import { currentArtistIndex } from "$stores/misc";

	export let maxArtistIndex;
</script>

<p class="count">{$currentArtistIndex + 1} of {maxArtistIndex}</p>

<style lang="scss">
	.count {
		color: rgba(120, 120, 120, 1);
		font-size: 14px;
		margin: 0;
		font-weight: 500;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		margin-bottom: 20px;
		margin-left: 2px;
	}
</style>
