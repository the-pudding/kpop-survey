<script>
	import { onMount } from "svelte";
	import Counter from "./Board.Counter.svelte";
	import Artist from "./Board.Artist.svelte";
	import Voter from "./Board.Voter.svelte";
	import Survey from "./Board.Survey.svelte";
	import Results from "./Board.Results.svelte";
	import localStorage from "$utils/localStorage.js";

	import {
		state,
		currentArtistIndex,
		shuffledArtists,
		entries
	} from "$stores/misc";

	export let copy;
	export let artists;

	$state = "voting";

	let currentArtist;
	let previousSubmission;

	onMount(() => {
		// Check if the shuffled version is already in localStorage
		$shuffledArtists = localStorage.get("shuffledArtists");

		if (!$shuffledArtists) {
			// If not, shuffle the artists and store the result
			$shuffledArtists = artists.slice().sort(() => Math.random() - 0.5);
			localStorage.set("shuffledArtists", JSON.stringify($shuffledArtists));
		} else {
			// Parse it if it exists
			$shuffledArtists = JSON.parse($shuffledArtists);
		}
	});

	let selectedFactors = [];

	$: if ($shuffledArtists?.length) {
		currentArtist = $shuffledArtists?.[$currentArtistIndex];

		if (
			$currentArtistIndex > $shuffledArtists.length - 1 &&
			$state == "voting"
		) {
			$state = "survey";
		}

		if (
			$currentArtistIndex > $shuffledArtists.length - 1 &&
			localStorage.get("surveyComplete")
		) {
			$state = "results";
		}
	}

	$: if (currentArtist) {
		previousSubmission = $entries.find(
			(entry) => entry.artist_id == currentArtist.id
		);
	}

</script>

{#if $shuffledArtists}
	<section
		class="board"
		style:--justify-content={$state == "voting" ? "space-between" : "center"}
	>
		{#if $state == "voting"}
			<Counter maxArtistIndex={artists.length} />
			<Artist artist={currentArtist} {previousSubmission} />

			<Voter artist={currentArtist} bind:previousSubmission />
		{:else if $state == "survey"}
			<Survey bind:selectedFactors copy={copy.survey} />
		{:else if $state == "results"}
			<Results {artists} copy={copy.results} />
		{/if}
	</section>
{/if}

<style lang="scss">
	.board {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		display: flex;
		margin: 0 auto;
		align-content: flex-start;
		flex-direction: column;
		justify-content: var(--justify-content);
	}
</style>
