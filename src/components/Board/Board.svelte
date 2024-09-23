<script>
	import Counter from "./Board.Counter.svelte";
	import Artist from "./Board.Artist.svelte";
	import Voter from "./Board.Voter.svelte";
	import Survey from "./Board.Survey.svelte";
	import viewport from "$stores/viewport.js";
	import { currentArtistIndex } from "$stores/misc";

	export let experienceStarted;

	export let artists;

	let results = [
		{
			id: 0,
			name: "I don't know",
			items: []
		},
		{
			id: 1,
			name: "1st",
			items: []
		},
		{
			id: 2,
			name: "2nd",
			items: []
		},
		{
			id: 3,
			name: "3rd",
			items: []
		},
		{
			id: 4,
			name: "4th",
			items: []
		},
		{
			id: 5,
			name: "5th",
			items: []
		}
	];

	let selectedFactors = [];

	$: currentArtist = artists?.[$currentArtistIndex];

	$: state = "voting";

	$: if ($currentArtistIndex > artists.length - 1) {
		state = "survey";
	}

	// $: console.log(state, currentArtist);
</script>

<section class="board" class:experienceStarted>
	{#if state == "voting"}
		<Counter maxArtistIndex={artists.length} />
		<Artist artist={currentArtist} />

		<Voter artist={currentArtist} bind:results />
	{:else if state == "survey"}
		<Survey bind:selectedFactors />
	{/if}
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
		justify-content: space-between;
	}
</style>
