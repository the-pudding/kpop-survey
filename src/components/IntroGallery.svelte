<script>
	import { isMobile } from "../stores/misc.js";
	import { base } from "$app/paths";

	let isReady = false;

	// Define image data with positions
	const images = [
		{
			src: "/assets/images/20.jpg",
			index: 1,
			position: { top: "60px", left: "50%" }
		},
		{
			src: "/assets/images/4.jpg",
			index: 2,
			position: { top: "270px", right: "10%" }
		},
		{
			src: "/assets/images/5.jpg",
			index: 3,
			position: { bottom: "250px", right: "10%" }
		},
		{
			src: "/assets/images/19.jpg",
			index: 4,
			position: { bottom: "120px", left: "50%" }
		},
		{
			src: "/assets/images/2.jpg",
			index: 5,
			position: { bottom: "270px", left: "10%" }
		},
		{
			src: "/assets/images/30.jpg",
			index: 6,
			position: { top: "250px", left: "10%" }
		}
	];

	// Simulate readiness state
	setTimeout(() => {
		isReady = true;
	}, 100); // Delay to allow images to animate in
</script>

<div id="intro-gallery">
	{#each images as { src, index, position }}
		<img
			src="{base}{src}"
			data-index={index}
			alt=""
			style="--top: {position.top || 'auto'}; --right: {position.right ||
				'auto'}; --bottom: {position.bottom ||
				'auto'}; --left: {position.left ||
				'auto'}; --translateX: {position.left === '50%' ? '-50%' : '0'};"
		/>
	{/each}
</div>

<style lang="scss">
	#intro-gallery {
		position: absolute;
		width: 100%;
		max-width: 1200px;
		height: 100%;
		z-index: -1;
		margin: 0 auto;
		left: 0;
		right: 0;

		img {
			width: 250px;
			position: absolute;
			border-radius: 30px;
			filter: drop-shadow(0 0.15rem 0.75rem #555);

			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-timing-function: ease-out;

			// Use CSS variables for dynamic positioning
			top: var(--top);
			right: var(--right);
			bottom: var(--bottom);
			left: var(--left);

			&[data-index="1"] {
				animation-name: flyInFromTop;
			}

			&[data-index="2"] {
				animation-name: flyInFromTopRight;
			}

			&[data-index="3"] {
				animation-name: flyInFromBottomRight;
			}

			&[data-index="4"] {
				animation-name: flyInFromBottom;
			}

			&[data-index="5"] {
				animation-name: flyInFromBottomLeft;
			}

			&[data-index="6"] {
				animation-name: flyInFromTopLeft;
			}
		}

		/* Keyframes for flying in from different directions */
		@keyframes flyInFromTop {
			from {
				transform: translateX(var(--translateX, 0)) translateY(-100vh);
			}
			to {
				transform: translateX(var(--translateX, 0)) translateY(0);
			}
		}

		@keyframes flyInFromTopRight {
			from {
				transform: translateX(100vh) translateY(-100vh);
			}
			to {
				transform: translateX(var(--translateX, 0)) translateY(0);
			}
		}

		@keyframes flyInFromBottomRight {
			from {
				transform: translateX(100vh) translateY(100vh);
			}
			to {
				transform: translateX(var(--translateX, 0)) translateY(0);
			}
		}

		@keyframes flyInFromBottom {
			from {
				transform: translateX(var(--translateX, 0)) translateY(100vh);
			}
			to {
				transform: translateX(var(--translateX, 0)) translateY(0);
			}
		}

		@keyframes flyInFromTopLeft {
			from {
				transform: translateX(-100vh) translateY(-100vh);
			}
			to {
				transform: translateX(var(--translateX, 0)) translateY(0);
			}
		}

		@keyframes flyInFromBottomLeft {
			from {
				transform: translateX(-100vh) translateY(100vh);
			}
			to {
				transform: translateX(var(--translateX, 0)) translateY(0);
			}
		}
	}
</style>
