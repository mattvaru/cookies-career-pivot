export type State = "CA" | "VA" | "OK";
export type LicenseType = "LMFT" | "LPC" | "LPCC" | "LCSW";

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface ScenarioInput {
  state: State;
  license: LicenseType;
  birthdate: Date;
  finishSonography: Date;
  travelMonths: number;
  travelCountries: Country[];
  workAsSonographer: boolean;
  workMonths: number;
  programLength: number;
  hoursPerWeek: number;
  directClientRatio: number;
  allowRemoteCoursework: boolean;
}

export interface TimelinePhase {
  type: "work" | "travel" | "masters" | "residency" | "licensed";
  startDate: Date;
  endDate: Date;
  label: string;
  color: string;
  description?: string;
}

export interface Milestone {
  date: Date;
  age: number;
  label: string;
  description: string;
  icon?: string;
}

export interface ScenarioResult {
  input: ScenarioInput;
  phases: TimelinePhase[];
  milestones: Milestone[];
  totalMonths: number;
  licenseDate: Date;
  ageAtLicense: number;
}

export interface LicenseRequirements {
  totalHours: number;
  directHours: number;
  supervisionHours: number;
  minWeeks: number;
  associateTitle: string;
  examRequirements: string[];
}