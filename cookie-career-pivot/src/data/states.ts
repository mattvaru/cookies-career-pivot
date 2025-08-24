import type { State } from "@/types";

export const stateNames: Record<State, string> = {
  CA: "California",
  VA: "Virginia", 
  OK: "Oklahoma",
  SC: "South Carolina"
};

export const getStateName = (stateCode: State): string => {
  return stateNames[stateCode];
};