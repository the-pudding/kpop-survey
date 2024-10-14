<script>
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import ChevronUp from "lucide-svelte/icons/chevron-up";
	import { addData, summarizeGenShare } from "$utils/supabase";
	import { userId, test } from "$stores/misc";
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
		if (!$test) addData(entry, "emails");
		isSubmitted = true;
	};

	let showResults = false;

	let results;

	onMount(async () => {
		window.scrollTo(0, 0);

		results = await summarizeGenShare();
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
	<h1 class="title-font">{copy.title}</h1>
	{#each copy.text.split("\n") as p}
		<p>{@html p}</p>
	{/each}

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

	<button
		class="reveal title-font"
		on:click={() => (showResults = !showResults)}
	>
		{#if showResults}
			Hide survey results
			<ChevronUp color={"#000"} strokeWidth={arrowStrokeWidth} />
		{:else}
			Show survey results
			<ChevronDown color={"#000"} strokeWidth={arrowStrokeWidth} />
		{/if}</button
	>

	{#if showResults && results.length}
		<div class="viz" in:slide out:slide>
			{#each artists as artist}
				<div class="row">
					<div class="artist">{artist.name}</div>
					<div class="plot">
						{#each genIds as gen, i}
							{@const result = results.find((r) => r.artist_id == artist.id)}

							{@const val = Number(result.gen_shares?.[gen]) * 100 || 0}
							{@const color = colors[i]}

							{@const isLargest = result?.highest_gen == gen}

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

	<div class="methodology">
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
		font-size: 40px;
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

			justify-content: space-between;
			flex-direction: column;

			text-align: left;

			.plot {
				width: 100%;
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
