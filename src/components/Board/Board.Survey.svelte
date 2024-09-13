<script>
	import ChevronRight from "lucide-svelte/icons/chevron-right";

	export let arrowStroke = "rgba(120, 120, 120, 1)";
	export let arrowStrokeWidth = "3";

	let factors = [
		"Debut year",
		"Peak active periods",
		"Association with other groups",
		"Length of contracts",
		"Member age ranges",
		"Member racial diversity",
		"Member positions (or lack thereof)",
		"Fashion trends",
		"Music genre trends",
		"Promotion models",
		"Fan interaction models",
		"Influence on industry",
		"Target audience",
		"Makeup of fanbase",
		"Other"
	];

	export let selectedFactors = [];

	function handleCheckboxChange(event) {
		const factor = event.target.value;
		if (event.target.checked) {
			selectedFactors = [...selectedFactors, factor];
		} else {
			selectedFactors = selectedFactors.filter((f) => f !== factor);
		}
	}

	$: console.log(selectedFactors);
</script>

<div id="survey">
	<h2>What factors did you consider to fit each group into a generation?</h2>
	<p>Select all that apply</p>
	<form>
		{#each factors as factor}
			<div class="round">
				<input
					type="checkbox"
					id={factor}
					name="factor"
					value={factor}
					aria-labelledby={`label-${factor}`}
					on:change={handleCheckboxChange}
				/>
				<label for={factor} id={`label-${factor}`} class="checkbox-label">
					<div class="factor-label">{factor}</div>
				</label>
			</div>
		{/each}
		<button class="next"
			>Next <ChevronRight
				color={arrowStroke}
				strokeWidth={arrowStrokeWidth}
			/></button
		>
	</form>
</div>

<style lang="scss">
	#survey {
		text-align: left;

		--accent-color: rgb(195, 115, 183);

		p {
			color: rgba(120, 120, 120, 1);
			font-size: 14px;
			margin: 0;
			font-weight: 500;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			margin-bottom: 20px;
			margin-left: 2px;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.round {
				display: flex;
				align-items: center;
				position: relative;

				.checkbox-label {
					background-color: #fff;
					border: 2px solid #9c9c9c;
					border-radius: 50%;
					cursor: pointer;
					display: inline-block;
					height: 28px;
					width: 28px;
					position: relative;

					&:after {
						content: "";
						position: absolute;
						top: 8px;
						left: 7px;
						width: 12px;
						height: 6px;
						border: 2px solid #fff;
						border-top: none;
						border-right: none;
						transform: rotate(-45deg);
						opacity: 0;
					}
				}

				input[type="checkbox"] {
					position: absolute;
					opacity: 0;
					width: 0;
					height: 0;

					&:focus + .checkbox-label {
						outline: 2px solid var(--accent-color);
						outline-offset: 2px;
					}

					&:checked + .checkbox-label {
						background-color: var(--accent-color);
						border-color: var(--accent-color);

						&:after {
							opacity: 1;
						}
					}
				}

				.factor-label {
					position: absolute;
					width: max-content;
					white-space: nowrap;
					margin-top: 1px;
					left: 35px;
				}
			}
		}
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	.next {
		font-size: 24px;
		letter-spacing: -0.5px;
		color: rgba(120, 120, 120, 1);
		line-height: 0.9;
		margin-right: 5px;
		background: none;
		text-align: left;
        text-decoration: underline;
	}
</style>
