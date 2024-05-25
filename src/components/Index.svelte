<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import { onMount } from "svelte";
	import artists from "$data/artists.csv"
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
	import Intro from "$components/Intro.svelte";
	import copy from "$data/copy.json";

	import Board from "$components/Board.svelte";

	function handleStartEvent(event) {
    	experienceStarted = event.detail.started;
  	}

	let board = [
		{
			id: 0,
			name: "artists",
			items: artists.slice(0,1)
		},
		{
			id: 1,
			name: "First Gen",
			items: []
		},
		{
			id: 2,
			name: "Second Gen",
			items: []
		},
		{
			id: 3,
			name: "Third Gen",
			items: []
		},
		{
			id: 4,
			name: "Fourth Gen",
			items: []
		},
		{
			id: 5,
			name: "Fifth Gen",
			items: []
		},
		{
			id:6,
			name: "Don't Know",
			items: []
		}
	];

	$: console.log(experienceStarted);
  	
	let experienceStarted = false;
	let mounted = false;
	let artistCount = 0;


	onMount(async () => {
		mounted = true;
	})
</script>

{#if mounted}
	{#if !experienceStarted}
		<Intro on:start={handleStartEvent} {copy}/>
	{/if}

	<!-- {#if experienceStarted} -->
		<Board {experienceStarted} columnItems={board}></Board>
	<!-- {/if} -->

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- <div class="artist"
		draggable=true
		on:click={() => click()}
		
		on:drag={() => dragging}
	>
		{artists[0].name}
	</div> -->
{/if}

<style>
	.artist {
		display: inline-block;
		user-select: none;
		-webkit-user-select: none;
		background-color: #FFF3CC;
		border: #DFBC6A 1px solid;
		width: auto;
		height: 50px;
		margin: 10px;
		padding: 8px;
		font-size: 18px;
		text-align: center;
		box-shadow: 2px 2px 2px #999;
		cursor: move;
	}
</style>





<!-- <WIP /> -->
<!-- <Demo /> -->
<!-- <Footer /> -->
