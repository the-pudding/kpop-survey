<script>
	import Counter from "./Board.Counter.svelte";
	import Artist from "./Board.Artist.svelte";
	import Voter from "./Board.Voter.svelte";
	import Survey from "./Board.Survey.svelte";
	import Results from "./Board.Results.svelte";
	import viewport from "$stores/viewport.js";
	import { state, currentArtistIndex } from "$stores/misc";

	export let experienceStarted;

	export let artists;

	let selectedFactors = [];

	$: currentArtist = artists?.[$currentArtistIndex];

	// $: state = "voting";

	$state = "voting";

	$: if ($currentArtistIndex > artists.length - 1 && $state == "voting") {
		$state = "survey";
	}

	// $: console.log(state, currentArtist);
</script>

<section
	class="board"
	class:experienceStarted
	style:--justify-content={$state == "voting" ? "space-between" : "center"}
>
	{#if $state == "voting"}
		<Counter maxArtistIndex={artists.length} />
		<Artist artist={currentArtist} />

		<Voter artist={currentArtist} />
	{:else if $state == "survey"}
		<Survey bind:selectedFactors />
	{:else if $state == "results"}
		<Results {artists}/>
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
		justify-content: var(--justify-content);
	}
</style>
