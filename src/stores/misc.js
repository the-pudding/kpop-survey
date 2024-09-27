import { writable, get } from "svelte/store";
import viewport from "./viewport";


export const isMobile = writable(get(viewport).width <= 500)
export const state = writable('intro')
export const userId = writable()
export const currentArtistIndex = writable(0)
export const isShowingToploader = writable(false)
export const toploaderImageName = writable()

export const test = writable(false)
