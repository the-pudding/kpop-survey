<script>
	import { setContext, onMount } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";
	import artists from "$data/artists.csv"

	export let data;
	let mounted = false;;
	let artistsMunged;

	version();

	const preloadFont = [
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
	];

	const { title, description, url } = copy.meta;
	setContext("copy", copy);
	setContext("data", data.data);

	onMount(() => {
		artists.forEach(d => {
			d.artistId = d.id;
		})
		mounted = true;
	})


</script>



<Meta {title} {description} {url} {preloadFont}  />

{#if mounted}
	<Index {artists} />
	<!-- <Index artists={artists.slice(0, 4)} /> -->
{/if}
