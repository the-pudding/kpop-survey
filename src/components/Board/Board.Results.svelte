<script>
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ChevronUp from "lucide-svelte/icons/chevron-up";
	import { addData, getGenSurveyData } from "$utils/supabase";
	import { userId } from "$stores/misc";
	import shadeColor from "$utils/shadeColor";

	export let artists;
	export let arrowStroke = "rgba(120, 120, 120, 1)";
	export let arrowStrokeWidth = "3";
	export let copy;

	let email = "";
	let isSubmitted = false;

	const handleSubmit = (e) => {
		e.preventDefault();

		let entry = {
			user_id: $userId,
			email: email
		};
		addData(entry, "emails");
		isSubmitted = true;
	};

	let showResults = false;

	function groupBy(xs, key) {
		return xs.reduce(function (rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	}

	let finalResults = {};

	onMount(async () => {
		let results = await getGenSurveyData();

		let groupedById = groupBy(results, "artist_id");

		Object.entries(groupedById).map(([artistId, items]) => {
			let groupedByGen = groupBy(items, "gen");

			let totalItems = items.length;

			let genPercentages = {};

			let highestGen;
			let highestGenValue = 0;

			Object.entries(groupedByGen).forEach(([gen, genItems]) => {
				let genCount = genItems.length;
				let percentage = ((genCount / totalItems) * 100).toFixed(2);
				genPercentages[gen] = percentage;
				if (percentage > highestGenValue) {
					highestGen = gen;
					highestGenValue = percentage;
				}
			});

			finalResults[artistId] = { ...genPercentages, highestGen };
		});
	});

	let genIds = [1, 2, 3, 4, 5, 0];
	let genLabels = ["1st", "2nd", "3rd", "4th", "5th", "IDK"];
	let colors = [
		"#e0afff",
		"#f0d9ff",
		"#e2dd9c",
		"#688f8a",
		"#a1c588",
		"#dddddd"
	];
</script>

<div id="results">
	<h2 class="title-font">{copy.title}</h2>
	<p>{copy.text}</p>

	<form on:submit={handleSubmit} class="email-signup">
		<input
			type="email"
			bind:value={email}
			placeholder="Email"
			required
			class="email-input"
			disabled={isSubmitted}
		/>
		<button type="submit" class="submit-button" disabled={isSubmitted}
			>{#if isSubmitted}Thank you!{:else}Submit{/if}</button
		>
	</form>

	<button class="reveal title-font" on:click={() => (showResults = !showResults)}>
		{#if showResults}
			Hide survey results
			<ChevronUp color={"#000"} strokeWidth={arrowStrokeWidth} />
		{:else}
			Show survey results
			<ChevronDown color={"#000"} strokeWidth={arrowStrokeWidth} />
		{/if}</button
	>

	{#if showResults}
		<div class="viz" in:slide out:slide>
			{#each artists as artist}
				<div class="row">
					<div class="artist">{artist.name}</div>
					<div class="plot">
						{#each genIds as gen, i}
							{@const result = finalResults[artist.id]}
							{@const val = Number(result?.[gen]) || 0}
							{@const color = colors[i]}
							{@const isLargest = result?.highestGen == gen}
							<div
								class="cell gen-{gen}"
								data-percentage="{val}%"
								style:--width="{val}%"
								style:--color={shadeColor(color, -40)}
								style:--bg={color}
							>
								{#if val > 10}
									<span class:isLargest
										>{#if gen}
											{genLabels[i]}{#if isLargest}&nbsp;gen ({val.toFixed(
													0
												)}%){/if}
										{/if}
									</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="methodology ">
		<h3 class="title-font">Methodology</h3>
		<p>{copy.methodology}</p>
	</div>
</div>

<style lang="scss">
	#results {
		margin-top: 25vh;
		text-align: left;

		--accent-color: rgb(195, 115, 183);

		p {
			margin: 0;
			font-weight: 400;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			margin-bottom: 20px;
			margin-left: 2px;
		}

		.email-signup {
			display: flex;
			border: 1px solid #000;
			border-radius: 10px;
			overflow: hidden;

			.email-input {
				flex: 1;
				padding: 1rem;
				border: none;
				outline: none;
			}

			.submit-button {
				background-color: #ddd;
				border: none;
				padding: 1rem;
				cursor: pointer;
				font-weight: bold;
				border-left: 1px solid #000;
				width: 100%;
				max-width: 200px;
			}

			.submit-button:not(:disabled):hover {
				background-color: #ccc;
			}

			.submit-button:disabled {
				cursor: auto;
			}
		}
	}

	.reveal {
		font-size: 24px;
		letter-spacing: -0.5px;

		line-height: 0.9;
		margin-right: 5px;
		background: none;
		margin: 0 auto;
		text-decoration: underline;
		display: flex;
		align-items: center;
		margin-top: 100px;
		margin-bottom: 50px;
	}

	.viz {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.row {
			display: flex;
			align-items: center;
			justify-content: space-between;

			@media only screen and (max-width: 700px) {
				flex-direction: column;
			}

			.plot {
				width: 100%;
				max-width: 500px;
				display: flex;
				border-radius: 5px;
				overflow: hidden;

				.cell {
					height: 40px;
					width: var(--width);
					display: flex;
					justify-content: center;
					align-items: center;

					background-color: var(--bg);
					color: var(--color);

					span {
						&.isLargest {
							font-weight: 500;
						}
					}
				}
			}
		}
	}

	.methodology {
		border-top: 1px solid #000;
		margin-top: 10rem;
		padding-top: 1rem;

	
	}
</style>
