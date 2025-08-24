import type { State } from "@/types";

export const stateNames: Record<State, string> = {
  CA: "California",
  VA: "Virginia", 
  OK: "Oklahoma"
};

export const getStateName = (stateCode: State): string => {
  return stateNames[stateCode];
};