<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from "svelte/transition"
    export let copy;

    const dispatch = createEventDispatcher();

    function startExperience() {
        dispatch('start', { started: true });
    }


</script>

<section transition:fade>
    <div class="overlay">
        <h1>
            {copy.intro.title}
        </h1>
        <h3>
            {copy.intro.dek}
        </h3>
        
        <button on:click={startExperience}>{copy.intro.button}</button>   
    </div> 
</section>

<style>
    .overlay {
        position: fixed;
        z-index: 1000;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: none;
    }

    button {
        background: #E4CEE1;
        border-radius: 20px;
        padding: 10px 24px;
        font-weight: 600;
        box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, .25);
        
    }

</style>




