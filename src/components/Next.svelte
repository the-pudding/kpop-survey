<script>
	export let text = "NEXT";
	export let onClick = () => {};
	export let fixed = true;
    export let fontSize = "2rem"
</script>

<button on:click={onClick} class="title-font" class:fixed style:--font-size={fontSize}>
	{text}
</button>

<style lang="scss">
	button {
		padding: 0.5rem 1rem;
		font-size: var(--font-size);
		border: none;
		background-color: var(--color-pink);
		color: #000;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
		transition: transform 0.5s;
		width: fit-content;

		&.fixed {
			position: fixed;
			right: 2rem;
            bottom: 100px;
		}
	}

	button:hover {
		transform: scale(1.1);
	}
</style>
