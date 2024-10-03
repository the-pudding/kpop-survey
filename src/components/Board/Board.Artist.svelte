<script>
	import { base } from "$app/paths";
	import { CirclePlay } from "lucide-svelte";
	import Player from "./Board.Player.svelte";
	import { isShowingToploader, toploaderImageName } from "$stores/misc";
	import { fade } from "svelte/transition";

	export let artist;
	export let currentArtistIndex;

	let artWidth;
	let artHeight;
</script>

<div class="artist title-font">
	<div class="artist__title">{artist.name}</div>
	<p class="artist__description">
		Debuted in {artist["debut year"]} under {artist.company} and their highest streaming
		song is
	</p>

	<Player {artist} {currentArtistIndex} />

	<div
		class="artist__art"
		bind:clientWidth={artWidth}
		bind:clientHeight={artHeight}
	>
		<div class="inner {artWidth < artHeight ? 'use-width' : 'use-height'}">
			<div class="layer back"></div>

			<div
				class="layer image"
				style:--image="url({base}/assets/images/{artist.id}.jpg)"
			></div>

			<div
				class="layer plastic"
				style:--image="url({base}/assets/toploaders/plastic.png)"
			></div>

			{#if $isShowingToploader}
				<div
					in:fade={{ duration: 500 }}
					class="layer toploader"
					style:--image="url({base}/assets/toploaders/{$toploaderImageName}.png)"
				></div>
			{/if}
		</div>
		<!-- <img src="{base}/assets/images/{artist.id}.jpg" alt="" /> -->
	</div>
</div>

<style lang="scss">
	.artist {
		width: 100%;
		font-weight: 400;
		margin: 0;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
		font-size: 40px;

		@media only screen and (max-width: 600px) {
			font-size: 36px;
		}

		&__title {
			color: #000;
			font-weight: bold;
			margin: 0;

			@media only screen and (max-width: 600px) {
				margin: 0;
			}
		}

		&__description {
			margin: 0px;
			color: #787878;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			font-weight: lighter;

			@media only screen and (max-width: 600px) {
				// font-size: 16px;
			}
		}

		&__player {
			display: block;
			display: flex;
			align-items: center;
			gap: 0.25rem;
			font-weight: 400;
		}

		&__art {
			width: 100%;
			height: 100%;

			@media only screen and (max-width: 600px) {
				margin: 0.5rem 0px;
			}
			.inner {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;

				&.use-width {
					.layer {
						width: 100%;
						aspect-ratio: 1 / 1;
					}
				}

				&.use-height {
					.layer {
						height: 100%;
						aspect-ratio: 1 / 1;
					}
				}

				.layer {
					background-image: var(--image);
					background-repeat: no-repeat;
					background-position: center;
					background-size: contain;
					position: absolute;
					margin: 0 auto;
					left: 0;
					right: 0;
				}

				.back {
					border-radius: 16px;
					// width: 100%;
					// height: 100%;
					background-color: #f7f7f7;

					filter: drop-shadow(2px 2px 6px #ddd);
					// background-repeat: no-repeat;
					// background-position: center;
					// background-size: contain;
					// position: absolute;
					// margin: 0 auto;
					// top: 0;
					// left: 0;
					// right: 0;
				}

				.plastic {
					z-index: 10;
				}

				.toploader {
					z-index: 20;
				}
				.plastic {
					border-radius: 16px;
					background-size: cover;
					mix-blend-mode: darken;
				}

				.image {
					border-radius: 5px;
					transform: scale(0.9);
				}
			}
		}
	}
</style>
