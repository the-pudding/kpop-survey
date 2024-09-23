<script>
	import { base } from "$app/paths";
	import { CirclePlay } from "lucide-svelte";
	import Player from "./Board.Player.svelte";
	import { isShowingToploader, toploaderImageName } from "$stores/misc";
	import { fade } from "svelte/transition";

	export let artist;
	export let currentArtistIndex;
</script>

<div class="artist">
	<h2 class="artist__title">{artist.name}</h2>
	<p class="artist__description">
		Debuted in {artist["debut year"]} under {artist.company} and their highest streaming
		song is
		<Player {artist} {currentArtistIndex} />
	</p>

	<div class="artist__art">
		{#if $isShowingToploader}
			<div
				in:fade={{ duration: 500 }}
				class="toploader"
				style:--toploader-url="url({base}/assets/toploaders/{$toploaderImageName}.png)"
			></div>
		{/if}
		<div
			class="image"
			style:--image="url({base}/assets/images/{artist.id}.jpg)"
		></div>
		<!-- <img src="{base}/assets/images/{artist.id}.jpg" alt="" /> -->
	</div>
</div>

<style lang="scss">
	.artist {
		font-size: 24px;
		width: 100%;
		color: #000;
		font-weight: 400;
		letter-spacing: -0.8px;
		margin: 0;
		line-height: 1.3;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;

		&__title {
			@media only screen and (max-width: 600px) {
				margin: 0;
			}
		}

		&__description {
			color: rgba(120, 120, 120, 1);
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;

			@media only screen and (max-width: 600px) {
				font-size: 16px;
			}
		}

		&__player {
			display: block;
			display: flex;
			align-items: center;
			gap: 0.25rem;
			font-weight: 500;
		}

		&__art {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-grow: 1;
			max-height: 100%;
			overflow: hidden;
			position: relative;

			.toploader {
				width: 100%;
				height: 100%;
				background-image: var(--toploader-url);
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
				position: absolute;
				top: 0;
				left: 0;
			}

			.image {
				height: 100%;
				width: 100%;

				background: var(--image);
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}
		}
	}
</style>
