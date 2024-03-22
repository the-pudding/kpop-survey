<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import { onMount } from "svelte";
	import {
		insert,
		readAll
	} from "$utils/supabase.js";
	import artists from "$data/artists.csv"
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";

	import Board from "$components/Board.svelte";


	let board = [
		{
			id: 1,
			name: "artists",
			items: artists
		},
		{
			id: 2,
			name: "gen 1",
			items: []
		},
		{
			id: 3,
			name: "gen 2",
			items: []
		}
	];

	let mounted = false;
	let artistCount = 0;
	async function click(){
		let thing = await readAll();
		console.log(thing)
	}

	onMount(async () => {
		mounted = true;
	})

</script>

{#if mounted}

	<Board columnItems={board}></Board>

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
