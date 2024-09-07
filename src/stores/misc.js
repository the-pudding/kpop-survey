import { writable, get } from "svelte/store";
import viewport from "./viewport";

console.log(viewport)
export const isMobile = writable(get(viewport).width <= 500)
