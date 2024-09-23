<script>
	import { base } from "$app/paths";

	import { getContext } from "svelte";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import Intro from "$components/Intro.svelte";
	import copy from "$data/copy.json";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import Tap from "$components/helpers/Tap.svelte";

	import Board from "$components/Board/Board.svelte";
	import IntroGallery from "./IntroGallery.svelte";

	// utils

	// function handleStartEvent(event) {
	// 	experienceStarted = event.detail.started;
	// }

	export let artists;

	let sliderEl;
	let activeSlide = 0;
	let dir;

	let inactive = [2];

	let experienceStarted = false;
	let mounted = false;

	const onTap = ({ detail }) => {
		if (detail === "right") sliderEl.next();
		else sliderEl.prev();
		window.scrollTo(0, 0);
		dir = detail;
	};

	onMount(async () => {
		mounted = true;
	});

	let preloadImageUrls = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
		23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
	].map((id) => `${base}/assets/images/${id}.jpg`);

	preloadImageUrls = [
		...preloadImageUrls,
		["1st", "2nd", "3rd", "4th", "5th"].map(
			(gen) => `${base}/assets/toploaders/${gen}.png`
		)
	];
</script>

<svelte:head>
	{#each preloadImageUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

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

				<Slide index={idx} cls={type == "voting" ? "" : "vertical-center"}>
					{#if type === "section"}
						{#each props as text}
							{#if isActive}
								<p
									transition:fly={{ y: 20, duration: 500 }}
									class="text"
									class:isActive
								>
									{@html text.value}
								</p>
							{/if}
						{/each}

						{#if idx == 1 && isActive}
							<!-- THIS IS THE COMPONENT -->
							<IntroGallery />
						{/if}
					{:else if type == "voting"}
						{#if isActive}
							<Board {experienceStarted} artists={artists.reverse()}></Board>
						{/if}
					{/if}
				</Slide>
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

<!-- <WIP /> -->

<!-- <Footer /> -->

<style lang="scss">
	.text {
		font-size: 33px;
		font-weight: 400;
		width: calc(100% - 50px);
		letter-spacing: -0.5px;
		line-height: 36px;
	}

	article {
		position: absolute;
		width: 100lvw;
		height: 100svh;
		// padding: 1rem;
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
		background-color: #fff3cc;
		border: #dfbc6a 1px solid;
		width: auto;
		height: 50px;
		margin: 10px;
		padding: 8px;
		font-size: 18px;
		text-align: center;
		box-shadow: 2px 2px 2px #999;
		cursor: move;
	}

	:global {
		.slide {
			display: flex;
			justify-content: center;
			padding: 1rem;
			text-align: center;

			&.vertical-center {
				align-items: center;
			}
		}
	}
</style>
