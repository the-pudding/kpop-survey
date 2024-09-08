<script>
	import Counter from "./Board.Counter.svelte";
	import Artist from "./Board.Artist.svelte";
	import Voter from "./Board.Voter.svelte";
	import viewport from "$stores/viewport.js";

	import { insert, readAll } from "$utils/supabase.js";
	import { addToGen } from "$utils/supabase";

	export let experienceStarted;
	export let results;
	export let artists;

	let currentArtistIndex = 1;

	$: currentArtist = artists[currentArtistIndex];

	$: console.log(currentArtist, results);
</script>

<section
	class="board"
	class:experienceStarted
	style="height:{$viewport.height}px;"
>
	<Counter {currentArtistIndex} maxArtistIndex={artists.length} />

	<Artist artist={currentArtist} />

	<Voter artist={currentArtist} bind:results bind:currentArtistIndex />
</section>

<style lang="scss">
	.board {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		margin: 0 auto;
		align-content: flex-start;
		flex-direction: column;
        margin-top: 100px;
        margin-bottom: 100px;
	}
</style>
