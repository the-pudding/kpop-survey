<script>
	import { base } from "$app/paths";
	import localStorage from "$utils/localStorage.js";
	import {
		userId,
		currentArtistIndex,
		isShowingToploader,
		toploaderImageName,
		entries,
		test
	} from "$stores/misc";

	import { addData, deleteEntry } from "$utils/supabase";

	import Next from "$components/Next.svelte";
	export let artist;
	export let previousSubmission;

	let results = [
		{
			id: 0,
			name: "I don't know"
		},
		{
			id: 1,
			name: "1st"
		},
		{
			id: 2,
			name: "2nd"
		},
		{
			id: 3,
			name: "3rd"
		},
		{
			id: 4,
			name: "4th"
		},
		{
			id: 5,
			name: "5th"
		}
	];

	let [idk, ...gens] = results;

	const handleVote = async (option) => {
		if (previousSubmission) {
			$entries = [...$entries.filter((entry) => entry.artist_id != artist.id)];
	

			if (!$test) await deleteEntry($userId, Number(artist.id))
	
			previousSubmission = undefined;
		}

		localStorage.set("currentArtistIndexCookie", $currentArtistIndex + 1);

		let entry = {
			artist_id: artist.id,
			gen: option.id,
			user_id: $userId
		};

		if (!$test) addData(entry, "entries");

		let interval;

		clearInterval(interval);

		if (option.id) {
			$isShowingToploader = true;
			$toploaderImageName = option.id;

			interval = setTimeout(() => {
				$isShowingToploader = false;
				$toploaderImageName = undefined;

				$entries = [...$entries, entry];

				localStorage.set("entriesCookie", $entries);
				++$currentArtistIndex;
			}, 1000);
		} else {
			$entries = [...$entries, entry];

			localStorage.set("entriesCookie", $entries);
			++$currentArtistIndex;
		}
	};

	const handleBack = () => {
		--$currentArtistIndex;
	};

	const handleNext = () => {
		++$currentArtistIndex;
	};


	const accents = ["#92BAFF", "#84F881", "#E05F89", "#565656", "#ECCA48"];
</script>

<div class="voter title-font" class:inactive={$isShowingToploader}>
	<p class="which" tabindex="0" aria-label="Use the following buttons to select which generation the artist is from, or select I don't know.">Which generation?</p>
	<div class="voter__controls">
		<div class="voter__controls__gens">
			{#each gens as option, i (option)}
				<button
					key={option}
					style:--toploader-url="url({base}/assets/toploaders/{option.id}.png)"
					style:--color-accent={accents[i]}
					class:active={ previousSubmission?.gen == option.id || $toploaderImageName == option.id}
					aria-label="{option.name} generation."
					on:click={() => handleVote(option)}>{option.name}</button
				>
			{/each}
		</div>

		<!-- <div class="idk">
			<Next
				onClick={() => handleVote(idk)}
				text="I don't know"
				fixed={false}
				fontSize="50px"
			/>
		</div> -->
		<div class="bottom-buttons">
			<button
				class="back title-font"
				class:hidden={!$currentArtistIndex}
				aria-hidden={!previousSubmission}
				on:click={() => handleBack()}>Back</button
			>
			<button class="idk title-font" on:click={() => handleVote(idk)}
				>{idk.name}</button
			>

			<button
				class="next title-font"
				class:hidden={!previousSubmission}
				aria-hidden={!previousSubmission}
				on:click={() => handleNext()}>Next</button
			>
		</div>
	</div>
</div>

<style lang="scss">
	.voter {
		flex-shrink: 0;

		&.inactive {
			pointer-events: none;
		}

		.which {
			font-size: 40px;

			margin: 50px 0px 0px 0px;
			text-align: left;
			color: rgba(120, 120, 120, 1);
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			margin-bottom: 1rem;
			margin-top: 1rem;

			@media only screen and (max-width: 600px) {
				// font-size: 16px;
			}
		}

		&__controls {
			text-align: left;
			font-size: 24px;
			font-weight: 400;
			letter-spacing: -0.8px;
			margin: 0;
			line-height: 1.3;
			text-align: left;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;

			.bottom-buttons {
				display: flex;
				justify-content: space-between;
				margin-top: 50px;
				padding-bottom: 25px;
				button {
					color: rgba(120, 120, 120, 1);
					background: transparent;
					font-size: 30px;
					padding: 0px;
			
					border-bottom: 2px solid;

					&.hidden {
						opacity: 0;
						pointer-events: none;
					}
				}
			}
		}
		&__controls__gens {
			display: flex;
			justify-content: center;
			// flex-wrap: wrap;
			gap: 1rem;
			margin: 0 auto;

			@media only screen and (max-width: 600px) {
				gap: 0.25rem;
			}

			button {
				background: #5f5f5f;
				width: 90px;
				aspect-ratio: 1/1;
				border-radius: 8%;
				color: white;
				position: relative;
				border: 2px solid white;

				@media only screen and (max-width: 600px) {
					width: 70px;
					font-size: 16px;
				}

				&::after {
					content: "";
					width: 100%;
					height: 100%;
					position: absolute;
					background-image: var(--toploader-url);
					background-size: cover;
					top: 0px;
					left: 0px;
				}

				transition: all 0.25s;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						background: #fff;
						color: #5f5f5f;
						border: 2px solid var(--color-accent);
					}
				}

				&.active {
					background: #fff;
					color: #5f5f5f;
					border: 2px solid var(--color-accent);
				}
			}
		}
	}
</style>
