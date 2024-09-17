import { range } from "d3";

function getReverseChronDate() {
  const m = new Date().getTime();
  const l = m.toString().length;
  const f = parseInt(
    range(l)
      .map(() => 9)
      .join(""),
    10
  );
  return f - m;
}

export default function generateId({
  chron = false,
  letters = true,
  numbers = true,
  chars = 8
}) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const pool = `${letters ? alphabet : ""}${numbers ? digits : ""}`;
  const date = chron ? getReverseChronDate() : "";

  const str = Array.from({ length: chars })
    .map(() => pool[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32) * pool.length)])
    .join("");

  return `${date}${str}`;
}
