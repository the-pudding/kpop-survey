<script>
	import { onMount } from "svelte";
	import inView from "$actions/inView.js";
	import wordmark from "$svg/wordmark.svg";

	let localURL;
	// let stories = [];

	let stories = [
		{
			image: "2020_04_music-challenge",
			url: "2020/04/music-challenge",
			hed: "Identifying Generational Gaps in Music",
			tease:
				"Take this quiz to see if you’re better than others your age at recognizing songs from history.",
			date: "04/30/2020",
			bgColor: "",
			fgColor: ""
		},
		{
			image: "2023_10_genre",
			url: "2023/10/genre",
			hed: "You should look at this chart about music genres.",
			tease:
				'Spotify tracks over 6,000 genres—everything from "rock" to "stomp-and-holler." Here\'s why that\'s cool.',
			date: "10/25/2023",
			bgColor: "",
			fgColor: ""
		},
		{
			image: "projects_music-history",
			url: "projects/music-history",
			hed: "Best Year in Music",
			tease:
				"Sit back and relax as we take you on an updated journey through every Billboard Top 5 hit to find music’s greatest era.",
			date: "06/14/2019",
			bgColor: "",
			fgColor: ""
		},
		{
			image: "2024_09_lineup",
			url: "2024/09/lineup",
			hed: "Batting by the Numbers",
			tease: "See how modern stats are reshaping baseball’s batting lineups.",
			date: "09/24/2024",
			bgColor: "",
			fgColor: ""
		}
	];

	// const v = Date.now();
	// const url = `https://pudding.cool/assets/data/stories.json?v=${v}`;

	const links = [
		{ name: "about", url: "https://pudding.cool/about" },
		{ name: "facebook", url: "https://facebook.com/pudding.viz/" },
		{ name: "twitter", url: "https://twitter.com/puddingviz/" },
		{
			name: "instagram",
			url: "https://www.instagram.com/the.pudding"
		},
		{ name: "patreon", url: "https://patreon.com/thepudding/" },
		{ name: "privacy", url: "https://pudding.cool/privacy/" },
		{ name: "newsletter", url: "https://thepuddingmail.substack.com" },
		{ name: "rss", url: "https://pudding.cool/feed/index.xml" }
	];

	// onMount(async () => {
	// 	localURL = window.location.href;
	// 	const response = await fetch(url);
	// 	const data = await response.json();
	// 	stories = data.filter((d) => !localURL.includes(d.url)).slice(0, 4);
	// });
</script>

<footer>
	<section class="stories">
		{#each stories as { hed, url, image }}
			{@const href = url.startsWith("http")
				? url
				: `https://pudding.cool/${url}`}
			<div class="story">
				<a {href}>
					<img
						src="https://pudding.cool/common/assets/thumbnails/640/{image}.jpg"
						alt="thumbnail"
					/>
					<span>{hed}</span>
				</a>
			</div>
		{/each}
	</section>

	<section class="about">
		<div class="wordmark">
			{@html wordmark}
		</div>
		<p>
			<a href="https://pudding.cool" target="_self">The Pudding</a>
			is a digital publication that explains ideas debated in culture with visual
			essays.
		</p>
	</section>

	<section class="links">
		<ul>
			{#each links as link}
				<li>
					<a href={link.url} target="_self">
						<span>{link.name.toUpperCase()}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</footer>

<style>
	footer {
		background-color: var(--color-fg);
		color: var(--color-bg);
		font-family: var(--sans);
		padding: 3em 1em;
		margin-top: 3em;
	}

	a,
	a:visited,
	a:hover {
		color: var(--color-bg);
	}

	.stories {
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		max-width: 70em;
	}

	.story {
		display: block;
		width: 100%;
		border: none;
		margin-bottom: 3rem;
	}

	.story a {
		display: block;
		font-weight: 900;
		text-decoration: none;
		border: none;
	}

	.story span {
		display: block;
		margin-top: 1em;
		line-height: 1.2;
	}

	.wordmark {
		max-width: 10em;
		margin: 1em auto;
	}

	.about {
		margin: 3rem auto;
		margin-top: 0;
		text-align: center;
	}

	.links ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.links li {
		display: flex;
		padding: 0.5em 1em;
	}

	.links a {
		display: flex;
		border: none;
		align-items: center;
		text-decoration: none;
	}

	.links span {
		margin-left: 0.5em;
	}

	@media only screen and (min-width: 30em) {
		.story {
			width: 50%;
			padding: 0 1em;
		}
	}

	@media only screen and (min-width: 50em) {
		.story {
			width: 25%;
			padding: 0 1em;
		}
	}
</style>
