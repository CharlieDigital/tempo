import { LexoRank } from "lexorank";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

const lexMax = LexoRank.max();
const lexMin = LexoRank.min();

/**
 * Generic rank sort function using the Lexorank.
 */
export function rankSort(a: { rank: string }, b: { rank: string }) {
  if (a.rank > b.rank) return 1;
  if (a.rank < b.rank) return -1;
  return 0;
}
