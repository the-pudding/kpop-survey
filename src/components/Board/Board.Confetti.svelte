<script>
	import { base } from "$app/paths";

	let images = [
		"confetti-purple-5.png",
		"big-blue-star.png",
		"big-diamond.png",
		"circle.png",
		"confetti-purple-1.png",
		"confetti-purple-2.png",
		"confetti-purple-3.png",
		"confetti-purple-4.png",
		"confetti-purple-6.png",
		"confetti-purple-7.png",
		"confetti-purple-8.png",
		"dot-cluster.png",
		"dot-set.png",
		"light-blue-star.png",
		"small-blue-star.png",
		"small-diamond.png",
		"sparkle.png",
		"yellow-star.png"
	];

	let containerH;

	// Generate random angles and animation durations
	const randomAngle = () => Math.random() * 360; // Random angle for the explosion direction
	$: randomDistance = () =>
		`${Math.random() * (containerH / 2) + containerH / 2}px`; // Distance they travel from the center (200-400px)
	const randomDuration = () => `${Math.random() * 1.5 + 1}s`; // Duration between 1.5s and 3s
	const randomScale = () => `${Math.random() * 1 + 5}`; // Scale between 1.5 and 2

	let preloadImageUrls = images.map(
		(image) => `${base}/assets/illos/confetti/${image}`
	);

	preloadImageUrls = [
		...preloadImageUrls,
		...["1", "2", "3", "4", "5"].map(
			(gen) => `${base}/assets/toploaders/${gen}.png`
		)
	];
</script>

<svelte:head>
	{#each preloadImageUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<div
	class="confetti-container"
	aria-hidden="true"
	bind:clientHeight={containerH}
	style:--height="{containerH}px"
>
	{#each [...images, ...images, ...images] as image, i}
		<img
			src="{base}/assets/illos/confetti/{image}"
			alt="confetti-{i}"
			class="confetti"
			style="--angle: {randomAngle()}deg; --distance: {randomDistance()}; animation-duration: {randomDuration()}; transform: scale({randomScale()});"
		/>
	{/each}
</div>

<style lang="scss">
	.confetti-container {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		display: flex;
		align-items: start;
		justify-content: center;
		overflow: hidden;
		z-index: 1000;
		pointer-events: none;
	}

	.confetti {
		position: absolute;
		width: 50px;
		animation: explode ease-out forwards;
	}

	@keyframes explode {
		0% {
			opacity: 0;
			transform: translate(0, 25vh) rotate(0deg);
		}
		10% {
			opacity: 1;
		}

		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translate(
					calc(var(--distance) * cos(var(--angle))),
					calc(var(--distance) * sin(var(--angle)))
				)
				rotate(360deg);
		}
	}
</style>
