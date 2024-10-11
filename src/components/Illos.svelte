<script>
	import { base } from "$app/paths";
	import viewport from "$stores/viewport";
	import { multiplyCssValue } from "$utils/multiplyCssValue";

	export let receded;

	// Adding a width property to each illo object based on approximate size in the reference image
	const illos = [
		{
			name: "controller",
			position: { top: "-5%", left: "15%" },
			width: "30vh"
		},
		{
			name: "toploader-credit",
			position: { top: "-7%", left: "0%" },
			width: "30vh",
			hideOnRecede: true
		},

		{
			name: "toploader",
			position: { top: "25%", left: "0%" },
			width: "20vh",
			transform: "rotate(135deg)"
		},
		{
			name: "mp3-player",
			position: { top: "15%", left: "-3%" },
			width: "30vh",
			transform: "rotate(140deg)"
		},

		{ name: "diamond", position: { top: "40%", left: "1%" }, width: "8vh" },
		{
			name: "cell",
			position: { bottom: "20%", left: "-1%" },
			width: "20vh",
			transform: "rotate(15deg)"
		},
		{ name: "smile", position: { bottom: "20%", left: "0%" }, width: "10vh" },
		{
			name: "star-1",
			position: { top: "40%", right: "15%" },
			width: "5vh",
			hideOnRecede: true
		},
		{
			name: "lollipop-pink",
			position: { bottom: "10%", left: "15%" },
			width: "7vh",
			transform: "rotate(15deg)",
			hideOnRecede: true
		},
		{
			name: "lollipop",
			position: { bottom: "0%", left: "30%" },
			width: "15vh",
			transform: "rotate(310deg)",
			hideOnRecede: true
		},
		{
			name: "pens",
			position: { bottom: "-10%", left: "0%" },
			width: "30vh",
			transform: "rotate(220deg)"
		},
		{
			name: "bear-1",
			position: { bottom: "2%", left: "20%" },
			width: "15vh",
			hideOnRecede: true
		},
		{
			name: "bear-2",
			position: { bottom: "17%", left: "22%" },
			width: "10vh",
			hideOnRecede: true
		},

		{
			name: "star-2",
			position: { top: "50%", left: "15%" },
			width: "10vh",
			hideOnRecede: true
		},
		{
			name: "star-3",
			position: { top: "45%", right: "18%" },
			width: "10vh",
			hideOnRecede: true
		},

		{
			name: "stickers",
			position: { top: "-10%", right: "-5%" },
			width: "35vh",
			transform: "rotate(220deg)"
		},
		{
			name: "tweezers",
			position: { top: "20%", right: "-10%" },
			width: "30vh",
			transform: "rotate(270deg)"
		}
	];

	let preloadImageUrls = [
		illos.map((gen) => `${base}/assets/illos/${name}.png`)
	];



	$: widthModifier =
		$viewport.width > 1200 ? 1 : $viewport.width > 800 ? 0.75 : 0.7;
</script>

<svelte:head>
	{#each preloadImageUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<div id="illos" aria-hidden="true">
	<div id="canvas" class:receded>
		{#each illos as illo}
			<img
				src="{base}/assets/illos/{illo.name}.png"
				alt={illo.name}
				class:hideOnRecede={illo.hideOnRecede}
				style="--top: {illo.position.top || 'unset'}; 
			       --bottom: {illo.position.bottom || 'unset'};
			       --left: {illo.position.left || 'unset'};
			       --right: {illo.position.right || 'unset'};
			       --width: {multiplyCssValue(illo.width, widthModifier)};
                   --transform: {illo.transform || 'unset'};"
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	#illos {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		#canvas {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			transition: all 0.5s;

			&.receded {
				width: 130%;
				left: -15%;
				top: -15%;
				height: 130%;
				opacity: 0.5;

				img.hideOnRecede {
					opacity: 0;
				}
			}

			img {
				position: absolute;
				width: var(--width, 100px); // Using the width defined in the array
				height: auto;
				filter: drop-shadow(6px 6px 6px #999);
				// Apply CSS variables for positioning
				top: var(--top, unset);
				bottom: var(--bottom, unset);
				left: var(--left, unset);
				right: var(--right, unset);
				transform: var(--transform, unset);
				transition: all 0.125s;
			}
		}
	}
</style>
