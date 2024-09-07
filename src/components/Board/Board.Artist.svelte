<script>
	import { base } from "$app/paths";
	import { CirclePlay } from "lucide-svelte";
	import Player from "./Board.Player.svelte";
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
		<img src="{base}/assets/images/{artist.id}.jpg" alt="" />
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

		&__title {
		}

		&__description {
			color: rgba(120, 120, 120, 1);
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			margin-bottom: 50px;
		}

		&__player {
			display: block;
			display: flex;
			align-items: center;
			gap: 0.25rem;
			font-weight: 500;
		}

		&__art {
			border-radius: 8%;
			background-size: cover;
			overflow: hidden;
			max-width: 600px;
			width: 100%;
			margin: 2rem auto;

			img {
				width: 100%;
			}
		}
	}
</style>
