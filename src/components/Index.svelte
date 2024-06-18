<script>
	import { getContext } from "svelte";
	import { onMount } from "svelte";
	import { fly } from 'svelte/transition';
	import Intro from "$components/Intro.svelte";
	import copy from "$data/copy.json";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import Tap from "$components/helpers/Tap.svelte";


	import Board from "$components/Board.svelte";

	function handleStartEvent(event) {
    	experienceStarted = event.detail.started;
  	}

	export let artists;

	let sliderEl;
	let activeSlide = 0;
	let dir;

	let inactive = [2]



	let board = [
		{
			id: 0,
			name: "artists",
			items: artists.reverse()//.slice(0,2)
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
		},
		{
			id:6,
			name: "I don't know",
			items: []
		}
	];

	$: console.log(experienceStarted);
  	
	let experienceStarted = false;
	let mounted = false;
	let artistCount = 0;


	const onTap = ({ detail }) => {
		if (detail === "right") sliderEl.next();
		else sliderEl.prev();
		window.scrollTo(0, 0);
		dir = detail;
	};

	onMount(async () => {
		mounted = true;
		console.log(copy)

	})
</script>

{#if mounted}

<!-- {#each allSlides as slide, i}
<Slide index={i}>
	{#each slide.text as { type, text }}
		<svelte:element this={type} class="slide-content">
			{@html text}
		</svelte:element>
	{/each}
</Slide>
{/each} -->
<article>
	<Slider bind:this={sliderEl} bind:current={activeSlide} duration="0">
		{#each copy.body.index || [] as { type, value: props, component }, idx (idx)}
		{@const isActive = idx == activeSlide ? true : false}
		<!-- {#each allSlides as slide, i} -->
			<Slide index={idx}>
				{#if type === "section"}
					{#each props as text}
					
						{#if isActive}
							<p transition:fly={{ y:20, duration:500 }} class="text" class:isActive>{@html text.value}</p>
						{/if}

					{/each}
					
				{:else if type == "voting"}
					{#if isActive && board}
						<Board {experienceStarted} data={board}></Board>
					{/if}
				{/if}
			</Slide>

			<!-- <p>{JSON.stringify(props)}</p> -->
		{/each}
	</Slider>

	{#if inactive.indexOf(activeSlide) == -1}
		<Tap
			debug={false}
			full={true}
			directions={activeSlide === 0 ? ["right"] : ["left", "right"]}
			size={activeSlide === 0 ? "100%" : ["33%", "67%"]}
			enableKeyboard={true}
			marginTop={0}
			showArrows={true}
			on:tap={onTap}
		/>
	{/if}


</article>

	<!-- {#if !experienceStarted}
		<Intro on:start={handleStartEvent} {copy}/>
	{/if} -->

	<!-- {#if experienceStarted} -->
		<!-- <Board {experienceStarted} columnItems={board}></Board> -->
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

.text {
	font-size: 33px;
	font-weight: 400;
	width: calc(100% - 50px);
	letter-spacing: -.5px;
	line-height: 36px;
}

article {
		position: absolute;
		width: 100vw;
		height: 100vh;
		padding: 1rem;
		z-index: 3;
	}
	:global(.slide a) {
		pointer-events: auto;
		white-space: nowrap;
	}

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
