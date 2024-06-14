<script>
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';
    import {cubicIn} from 'svelte/easing';
	import { base } from "$app/paths";

    import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
    import viewport from '$stores/viewport.js'

	import {
		insert,
		readAll
	} from "$utils/supabase.js";
	import { addToGen } from '../utils/supabase';

    export let columnItems;
    export let experienceStarted;

    let dropTargetStyle = {outline: 'red solid 2px'};

    const flipDurationMs = 200;
    function handleDndConsiderColumns(e) {
        columnItems = e.detail.items;
    }
    function handleDndFinalizeColumns(e) {
        columnItems = e.detail.items;
    }
    function handleDndConsiderCards(cid, e) {

        const colIdx = columnItems.findIndex(c => c.id === cid);
        columnItems[colIdx].items = e.detail.items;
        columnItems = [...columnItems];
    }
    async function handleDndFinalizeCards(cid, e) {
        const colIdx = columnItems.findIndex(c => c.id === cid);
        columnItems[colIdx].items = e.detail.items;
        columnItems = [...columnItems];
        let thing = await addToGen(cid, e);
    }
    async function handleClick(item) {
		
    }

    function transformDraggedElement(draggedEl, data, index) {
        // draggedEl.style.transform = "rotate(10deg)";

        // console.log(draggedEl,data)
		// const msg = `My index is ${index}`;
        // draggedEl.classList.add("dragging-artist");
        // draggedEl.style.display = 'none';
        // draggedEl.style.visibility = 'hidden';
        // draggedEl.style.background = 'rgba(0,0,0,0)';

		// draggedEl.innerHTML = `<div class='money' style='width:20px, height:20px; background:red;'>hiiiii</div>`;
	}
</script>

<!-- <svg width="35" height="38" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.0889 35.8779C21.984 37.016 19.0524 37.1458 16.2939 36.2676C13.5355 35.3893 10.9688 33.5153 8.59375 30.6455L2.35938 23.1123C2.16146 22.8649 1.96973 22.5866 1.78418 22.2773C1.611 21.9557 1.47493 21.6589 1.37598 21.3867C1.01725 20.4219 1.06673 19.556 1.52441 18.7891C1.9821 18.0098 2.64388 17.4655 3.50977 17.1562C4.14062 16.9336 4.7653 16.9089 5.38379 17.082C6.00228 17.2428 6.58366 17.6077 7.12793 18.1768L9.24316 20.459C9.30501 20.5332 9.36068 20.5579 9.41016 20.5332C9.49674 20.4961 9.52767 20.4281 9.50293 20.3291L4.25195 5.91211C3.85612 4.79883 3.86849 3.77832 4.28906 2.85059C4.72201 1.92285 5.47038 1.26107 6.53418 0.865234C7.57324 0.494141 8.55046 0.53125 9.46582 0.976562C10.3936 1.40951 11.0615 2.1888 11.4697 3.31445L13.5293 8.99219C13.9128 8.73242 14.29 8.52832 14.6611 8.37988C15.4281 8.10775 16.1579 8.07682 16.8506 8.28711C17.5557 8.48503 18.1494 8.89323 18.6318 9.51172C19.0895 9.15299 19.5658 8.88704 20.0605 8.71387C20.7904 8.44173 21.4769 8.39844 22.1201 8.58398C22.7757 8.75716 23.3262 9.12826 23.7715 9.69727C25.4043 9.12826 26.8825 9.24577 28.2061 10.0498C29.5296 10.8415 30.5625 12.2516 31.3047 14.2803L32.7148 18.1582C33.7168 20.9043 34.057 23.4525 33.7354 25.8027C33.4137 28.1406 32.5169 30.1816 31.0449 31.9258C29.5729 33.6576 27.5876 34.9749 25.0889 35.8779ZM24.2725 33.3359C26.3258 32.5814 27.9339 31.5052 29.0967 30.1074C30.2718 28.7096 30.9583 27.0521 31.1562 25.1348C31.3665 23.2051 31.0511 21.0775 30.21 18.752L29.0039 15.4678C28.4967 14.1071 27.903 13.1299 27.2227 12.5361C26.5423 11.9424 25.8249 11.7816 25.0703 12.0537L25.7754 14.0205C25.8867 14.3421 25.8682 14.6514 25.7197 14.9482C25.5837 15.2327 25.3672 15.4245 25.0703 15.5234C24.7611 15.6471 24.4518 15.6533 24.1426 15.542C23.8333 15.4183 23.6169 15.1895 23.4932 14.8555L22.5098 12.1279C22.349 11.6826 22.0954 11.3734 21.749 11.2002C21.415 11.0146 21.0378 11.0023 20.6172 11.1631C20.2461 11.3115 19.9368 11.5094 19.6895 11.7568L20.8584 15.0596C20.9821 15.3812 20.9697 15.6842 20.8213 15.9688C20.6729 16.2533 20.444 16.4512 20.1348 16.5625C19.8379 16.6738 19.5348 16.6676 19.2256 16.5439C18.9163 16.4202 18.7061 16.1914 18.5947 15.8574L17.1104 11.8125C16.9495 11.3548 16.696 11.0456 16.3496 10.8848C16.0156 10.7116 15.6445 10.7054 15.2363 10.8662C15.0508 10.9157 14.8776 10.9961 14.7168 11.1074C14.556 11.2188 14.4076 11.3301 14.2715 11.4414L15.96 16.0615C16.0837 16.3831 16.0713 16.6924 15.9229 16.9893C15.7744 17.2738 15.5456 17.4655 15.2363 17.5645C14.9395 17.7005 14.6364 17.7067 14.3271 17.583C14.0179 17.4469 13.8014 17.2181 13.6777 16.8965L8.9834 4.01953C8.87207 3.64844 8.66178 3.38867 8.35254 3.24023C8.04329 3.0918 7.71549 3.07943 7.36914 3.20312C7.02279 3.33919 6.77539 3.56803 6.62695 3.88965C6.47852 4.19889 6.47233 4.52669 6.6084 4.87305L13.2139 22.9824C13.3623 23.403 13.3623 23.7865 13.2139 24.1328C13.0654 24.4792 12.7995 24.7204 12.416 24.8564C12.1068 24.9801 11.7852 25.0111 11.4512 24.9492C11.1296 24.875 10.7894 24.6523 10.4307 24.2812L6.10742 19.8281C5.625 19.321 5.13021 19.1602 4.62305 19.3457C4.27669 19.4694 4.03548 19.6797 3.89941 19.9766C3.77572 20.2611 3.76953 20.5518 3.88086 20.8486C3.97982 21.1084 4.12826 21.3434 4.32617 21.5537L10.542 29.0312C12.6943 31.6165 14.9085 33.1999 17.1846 33.7812C19.473 34.375 21.8356 34.2266 24.2725 33.3359Z" fill="white"/>
    </svg> -->
    

<section
    class="board"
    class:experienceStarted
    style="height:{$viewport.height}px;"
>
    {#each columnItems as column (column.id)}
        <div class="column column-{column.id} {column.id == 0 ? "column-artists" : 'column-gen'}"
             animate:flip="{{duration: flipDurationMs}}">
            <div class="column-content"
                use:dndzone={{
                    centreDraggedOnCursor:true,
                    items:column.items,
                    flipDurationMs,
                    morphDisabled:true,
                    transformDraggedElement,
                    dropTargetStyle:dropTargetStyle,
                }}
                on:consider={(e) => handleDndConsiderCards(column.id, e)}
                on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
            >
                {#each column.items as item (item.id)}
                <!-- data-is-dnd-shadow-item-hint={item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}  -->
                    <!-- <div class="card" data-id={item.id} animate:flip="{{duration: flipDurationMs}}" on:click={handleClick(item)}> -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="card-container" animate:flip="{{duration: flipDurationMs}}" on:click={handleClick(item)}>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <div class="card" on:click={handleClick}
                            style="background-image: url({base}/assets/image.jpg);"
                            >
                                {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                                    <div in:fade={{duration:200, easing: cubicIn}} class='custom-shadow-item'><span>{item.name}</span></div>
                                {/if}
                            </div>
                        </div>
                        <!-- <span>{item.name}</span> -->
                    <!-- </div> -->
                {/each}

            </div>
            {#if column.id > 0}
                <div class="column-title"><p>{column.name}</p></div>
            {/if}
        </div>
    {/each}
</section>

<style>

    :global(#dnd-action-dragged-el .card) {
		width: 40px;
		height: 40px;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        margin: 0 auto;
        transform: translate(0,-50%);
		transition: width 1s;
	}

    .custom-shadow-item {
		position: absolute;
		top: 0; left:0; right: 0; bottom: 0;
		visibility: visible;
        /* width: 100px; */
        /* height: 100px; */
		border: 1px dashed grey;
		background: #6979a8;
		opacity: 0.4;
		margin: 0;
        display: block;
        /* height: 70px; */
        /* width: 70px; */
        /* position: relative; */
        /* padding: 2rem 2rem; */
        
        /* margin: 0.4em 0; */
        /* display: flex; */
        /* margin-left: 10px; */
        /* justify-content: center; */
        /* align-items: center; */
        /* background-color: #dddddd; */
        border-radius: 8%;

	}

    .custom-shadow-item * {
        display: none;
    }

    .board {
        width: 100%;
        padding: 0.5em;
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        align-content: flex-start;
        flex-direction: row;
        padding-top: 50px;
    }
    .column {
        margin: 0 auto;
        width: calc(20% - 10px);
        /* height: 200px; */
        max-width: 700px;
        /* height: 150px; */
        position: relative;
        /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
        aspect-ratio: .8;
    }

    .column-6 {
        width: 100%;
    }

    .column-6.column-gen .column-content {
        background: none;
    }

    .column-6 .column-title {
        font-size: 18px;
        color: rgba(132, 132, 132, 1);
        font-weight: 400;
        background: none;
        top: 0;
        transform: translate(0,100%);
        width: fit-content;
        display: inline-block;
        border-bottom: 1px solid;
    }
    .column-content {

        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        flex-direction: row;
        display: flex;
    }


    .column-artists .column-content {
        flex-direction: column;
        background-color: rgba(255,255,255,.2);
        padding: 20px;
        border-radius: 14px;
        width: 200px;
        margin: 0 auto;
    }     

    .column-gen .column-content {
        height: 100%;
        background-color: rgba(227, 225, 225, 1);
        border-radius: 10px;
        flex-wrap: wrap;
        display: grid;
        grid-template-columns: calc(33.333% - 3.33px) calc(33.333% - 3.33px) calc(33.333% - 3.33px);
        gap: 5px;
        width: 100%;
        padding: 12px;
        position: relative;
        overflow: hidden;
        overflow-y: scroll;

    }
    .column-title {
        font-weight: 600;
        font-size: 16px;
        pointer-events: none;
        z-index: 100000;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 50%;
        transform: translate(0, -50%);
    }

    .column-title p {
        margin: 0;
        text-align: center;
    }
    .column-artists {
        width: 100%;
        height: 200px;
        order: 1;
        border-radius: 14px;
        margin-bottom: 50px;
    }

    .card-container {
        width: 100px;
        position: relative;
    }

    .column-artists .card-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        margin-bottom: 10px;
    }

    .column-gen .card-container {
        /* width: 70px; */
        /* height: 70px; */
        /* margin-left: 10px; */
        /* margin-top: 10px; */
        width: 100%;
        aspect-ratio: 1 / 1;
        grid-column: auto / span 1;
    }

    .card-container .card {
        width: 100%;
        height: 100%;
    }

    .card {
        position: absolute;
        background-size: cover;
        left: 0;
        right: 0;
        top: 50%;
        margin: 0 auto;
        transform: translate(0,-50%);
		transition: width 1s;
        background-color: #dddddd;
        border-radius: 8%;
    }
    .column-gen {
        opacity: 1;
        order: 2;
    }

    .experienceStarted .column-gen{
        opacity: 1;
    }
</style>