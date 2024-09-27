<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Meta from "$components/Meta.svelte";
	import generateId from "$utils/generateId.js";
	import localStorage from "$utils/localStorage.js";
	import { userId, currentArtistIndex, state, test } from "$stores/misc";
	import { getContext } from "svelte";


	if (typeof window !== "undefined") {
		function checkAndClearParams() {
			const urlParams = new URLSearchParams(window.location.search);

			if (urlParams.get("clearId") === "true") {
				localStorage.remove("userId");
			}

			if (urlParams.get("clearCurrentArtistIndex") === "true") {
				localStorage.remove("currentArtistIndex");
			}

			if (urlParams.get("clearSurveyComplete") === "true") {
				localStorage.remove("surveyComplete");
			}

			if (urlParams.get("test") === "true") {
				$test = true
			}

			if (urlParams.get("clear") === "true") {
				localStorage.remove("userId");
				localStorage.remove("currentArtistIndex");
				localStorage.remove("surveyComplete");
			}
		}

		function initializeUser() {
			// Handle custom ID
			$userId = localStorage.get("userId");

			if (!$userId) {
				const newUserId = generateId({
					chron: true,
					letters: true,
					numbers: true,
					chars: 10
				});
				localStorage.set("userId", newUserId);
				$userId = localStorage.get("userId");
			}

			// Handle last submitted ID
			$currentArtistIndex =
				localStorage.get("currentArtistIndex") || $currentArtistIndex;



		}

		// Call functions on client-side only
		checkAndClearParams();
		initializeUser();
	}
</script>


<Header />
<main id="content">
	<slot />
</main>
<!-- <WIP /> -->
{#if $state == "results"}
	<Footer />
{/if}