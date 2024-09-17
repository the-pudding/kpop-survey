<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import generateId from "$utils/generateId.js";
	import localStorage from "$utils/localStorage.js";
	import { userId, currentArtistIndex } from "$stores/misc";

	if (typeof window !== "undefined") {
		function checkAndClearParams() {
			const urlParams = new URLSearchParams(window.location.search);

			if (urlParams.get("clearId") === "true") {
				localStorage.remove("userId");
			}

			if (urlParams.get("clearCurrentArtistIndex") === "true") {
				localStorage.remove("currentArtistIndex");
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

<!-- <Header /> -->
<main id="content">
	<slot />
</main>
