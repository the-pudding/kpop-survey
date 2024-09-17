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

	export let results;

	export let artist;

	let [idk, ...gens] = results;

	const handleVote = (option) => {
		// results[option.id].items.push(artist);

		localStorage.set("currentArtistIndex", $currentArtistIndex);
		let entry = {
			created_at: new Date(),
			artist_id: artist.id,
			gen: option.id,
			user_id: $userId
		};
		addGenSurveyData(entry);
		let interval

		clearInterval(interval)
		
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
			{#each gens as option, i}
				<button
					style:--toploader-url="url({base}/assets/toploaders/{option.name}.png)"
					style:--color-accent={accents[i]}
					class:active={$toploaderImageName == option.name}
					on:click={() => handleVote(option)}>{option.name}</button
				>
			{/each}
		</div>

		<button class="idk" on:click={() => handleVote(idk.id)}>{idk.name}</button>
	</div>
</div>

<style lang="scss">
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
		margin-bottom: 50px;
	}

	.voter {

		&.inactive {
			pointer-events: none;
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
			margin-bottom: 50px;

			.idk {
				background: none;
				text-decoration: underline;
				text-align: left;
				color: rgba(120, 120, 120, 1);
				margin: 0px;
				padding: 0px;
				font-size: 18px;
			}
		}
		&__controls__gens {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: 1rem;
			margin: 0 auto;

			button {
				background: #5f5f5f;
				width: 90px;
				height: 90px;
				border-radius: 8%;
				color: white;
				position: relative;
				border: 2px solid white;

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

				&:hover, &.active {
					background: #fff;
					color: #5f5f5f;
					border: 2px solid var(--color-accent);
				}
			}
		}
	}
</style>
