<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Meta from "$components/Meta.svelte";
	import generateId from "$utils/generateId.js";
	import localStorage from "$utils/localStorage.js";
	import {
		userId,
		currentArtistIndex,
		entries,
		state,
		test
	} from "$stores/misc";
	import { getContext } from "svelte";

	if (typeof window !== "undefined") {
		function checkAndClearParams() {
			const urlParams = new URLSearchParams(window.location.search);

			if (urlParams.get("clearId") === "true") {
				localStorage.remove("userIdCookie");
			}

			if (urlParams.get("clearCurrentArtistIndex") === "true") {
				localStorage.remove("currentArtistIndexCookie");
			}

			if (urlParams.get("clearShuffledArtists") === "true") {
				localStorage.remove("shuffledArtistsCookie");
			}

			if (urlParams.get("clearSurveyComplete") === "true") {
				localStorage.remove("surveyCompleteCookie");
			}

			if (urlParams.get("clearEntries") === "true") {
				localStorage.remove("entriesCookie");
			}

			if (urlParams.get("test") === "true") {
				$test = true;
				console.log("----In testing mode!----");
			}

			if (urlParams.get("clear") === "true") {
				localStorage.remove("userIdCookie");
				localStorage.remove("currentArtistIndexCookie");
				localStorage.remove("surveyCompleteCookie");
				localStorage.remove("shuffledArtistsCookie");
				localStorage.remove("entriesCookie");
			}
		}

		function initializeUser() {
			$userId = localStorage.get("userIdCookie");

			if (!$userId) {
				const newUserId = generateId({
					chron: true,
					letters: true,
					numbers: true,
					chars: 10
				});
				localStorage.set("userIdCookie", newUserId);
				$userId = localStorage.get("userIdCookie");
			}

			// Handle last submitted ID
			$currentArtistIndex =
				localStorage.get("currentArtistIndexCookie") || $currentArtistIndex;

			$entries = localStorage.get("entriesCookie") || $entries;
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
