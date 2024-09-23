<script>
	import { base } from "$app/paths";
	import localStorage from "$utils/localStorage.js";
	import {
		userId,
		currentArtistIndex,
		isShowingToploader,
		toploaderImageName
	} from "$stores/misc";

	import { addGenSurveyData } from "$utils/supabase";

	export let artist;

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

	const handleVote = (option) => {
		// results[option.id].items.push(artist);

		localStorage.set("currentArtistIndex", $currentArtistIndex + 1);
		let entry = {
			created_at: new Date(),
			artist_id: artist.id,
			gen: option.id,
			user_id: $userId
		};
		addGenSurveyData(entry);
		let interval;

		clearInterval(interval);

		if (option.id) {
			$isShowingToploader = true;
			$toploaderImageName = option.name;

			interval = setTimeout(() => {
				$isShowingToploader = false;
				$toploaderImageName = undefined;
				++$currentArtistIndex;
			}, 1000);
		} else {
			++$currentArtistIndex;
		}
	};

	const accents = ["#92BAFF", "#84F881", "#E05F89", "#565656", "#ECCA48"];
</script>

<div class="voter" class:inactive={$isShowingToploader}>
	<p class="which">Which generation?</p>
	<div class="voter__controls">
		<div class="voter__controls__gens">
			{#each gens as option, i (option)}
				<button
					key={option}
					style:--toploader-url="url({base}/assets/toploaders/{option.name}.png)"
					style:--color-accent={accents[i]}
					class:active={$toploaderImageName == option.name}
					on:click={() => handleVote(option)}>{option.name}</button
				>
			{/each}
		</div>

		<button class="idk" on:click={() => handleVote(idk)}>{idk.name}</button>
	</div>
</div>

<style lang="scss">
	.voter {
		flex-shrink: 0;

		&.inactive {
			pointer-events: none;
		}

		.which {
			font-size: 24px;
			font-weight: 400;
			letter-spacing: -0.8px;
			margin: 0;
			line-height: 1.3;
			text-align: left;
			color: rgba(120, 120, 120, 1);
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			margin-bottom: 1rem;
			margin-top: 1rem;

			@media only screen and (max-width: 600px) {
				font-size: 16px;
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

			.idk {
				background: none;
				text-decoration: underline;
				text-align: left;
				color: rgba(120, 120, 120, 1);
				margin: 0px;
				padding: 0px;
				font-size: 18px;
				@media only screen and (max-width: 600px) {
					font-size: 16px;
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
