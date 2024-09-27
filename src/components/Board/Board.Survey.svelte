<script>
	import Next from "$components/Next.svelte";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import localStorage from "$utils/localStorage.js";
	import { state, userId } from "$stores/misc";
	import { addData } from "$utils/supabase";

	export let arrowStroke = "rgba(120, 120, 120, 1)";
	export let arrowStrokeWidth = "3";
	export let selectedFactors = [];
	export let copy;



	function handleCheckboxChange(event) {
		const factor = event.target.value;
		// Check if already selected and handle deselection
		if (event.target.checked) {
			if (selectedFactors.length < 3) {
				selectedFactors = [...selectedFactors, factor];
			} else {
				// Prevent more than 3 checkboxes being checked
				event.target.checked = false;
			}
		} else {
			selectedFactors = selectedFactors.filter((f) => f !== factor);
		}
	}

	function handleSubmit() {
		let entry = {
			user_id: $userId,
			response: selectedFactors.join(';')
		};
		addData(entry, "survey");
		localStorage.set("surveyComplete", true);
		$state = "results";
	}
</script>

<div id="survey">
	<h2 class="title-font">{copy.title}</h2>
	<p>{copy.text}</p>
	<form>
		{#each copy.factors as factor}
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
		<Next onClick={handleSubmit} fixed={false}/>
		<!-- <button class="next" on:click={handleSubmit}
			>Next <ChevronRight
				color={arrowStroke}
				strokeWidth={arrowStrokeWidth}
			/></button
		> -->
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
					border-radius: 8%;
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

</style>
