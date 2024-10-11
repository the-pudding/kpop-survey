<script>
	import { base } from "$app/paths";
	export let artist;

	let audio;
	let playing = false;
	let previousArtist;

	$: {
		if (previousArtist && previousArtist.id !== artist.id && playing) {
			stopAudio();
		}
		previousArtist = artist;
	}

	function toggleAudio() {
		if (playing) {
			stopAudio();
		} else {
			playing = true;
			if (!audio) {
				audio = new Audio(`${base}/assets/audio/${artist.id}.mp3`);
				audio.play();
			}
		}
	}

	function stopAudio() {
		playing = false;
		if (audio) {
			audio.pause();
			audio = null;
		}
	}
</script>

<button class="artist__player title-font" aria-label="{artist.song}. Click to play a sample." on:click={toggleAudio} tabindex="0" >
	{#if playing}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="30 30 1140 1140"
		>
			<path
				d="m600 30c-314.39 0-570 255.61-570 570s255.61 570 570 570 570-255.61 570-570-255.61-570-570-570zm-96 788.39c0 30-25.219 55.219-55.219 55.219s-55.219-25.219-55.219-55.219l0.046875-436.78c0-30 25.219-55.219 55.219-55.219s55.219 25.219 55.219 55.219zm302.39 0c0 30-25.219 55.219-55.219 55.219s-55.219-25.219-55.219-55.219l0.046875-436.78c0-30 25.219-55.219 55.219-55.219s55.219 25.219 55.219 55.219z"
			></path></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="223.2 223.2 753.6 753.6"
		>
			<path
				d="m600 223.2c-207.6 0-376.8 169.2-376.8 376.8s169.2 376.8 376.8 376.8 376.8-169.2 376.8-376.8-169.2-376.8-376.8-376.8zm159.6 408-219.6 130.8c-16.801 9.6016-39.602 4.8008-49.199-13.199-3.6016-6-4.8008-12-4.8008-18v-261.6c0-20.398 15.602-36 36-36 6 0 13.199 1.1992 18 4.8008l219.6 130.8c16.801 9.6016 22.801 32.398 12 49.199-2.4023 6-7.2031 9.6016-12 13.199z"
			/>
		</svg>
	{/if}

	<span> {artist.song}</span>
	</button>

<style lang="scss">
	.artist__player {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-weight: 500;
		cursor: pointer;
		margin-top: 0.25rem;
		color: #787878;
		background: none;
		font-size: inherit;

	

		svg {
			height: 35px;
			width: 35px;
			fill: #787878;
			transition: fill 0.25s;
		}

		span {
			margin-top: 7px;
		}

		&:hover {
			svg {
				fill: #555;
			}
		}
	}
</style>
