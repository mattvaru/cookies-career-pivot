import { 
  addMonths, 
  differenceInMonths, 
  differenceInYears
} from "date-fns";
import type { 
  ScenarioInput, 
  ScenarioResult, 
  TimelinePhase, 
  Milestone 
} from "@/types";
import { licenseRules, phaseColors } from "@/data/rules";

export function calculateAge(birthdate: Date, targetDate: Date): number {
  const years = differenceInYears(targetDate, birthdate);
  const months = differenceInMonths(targetDate, birthdate) % 12;
  return years + (months >= 6 ? 0.5 : 0);
}

export function findNextSeptember(afterDate: Date): Date {
  const year = afterDate.getFullYear();
  const month = afterDate.getMonth();
  
  if (month < 8) {
    return new Date(year, 8, 1);
  } else {
    return new Date(year + 1, 8, 1);
  }
}

export function calculateResidencyDuration(
  state: string,
  license: string,
  hoursPerWeek: number,
  directClientRatio: number
): number {
  const requirements = licenseRules[state as keyof typeof licenseRules]?.[license as keyof typeof licenseRules["CA"]];
  if (!requirements) return 24;

  const totalHours = requirements.totalHours;
  const directHours = requirements.directHours;
  const minWeeks = requirements.minWeeks;

  const directHoursPerWeek = hoursPerWeek * directClientRatio;
  const weeksForDirectHours = Math.ceil(directHours / directHoursPerWeek);
  const weeksForTotalHours = Math.ceil(totalHours / hoursPerWeek);
  
  const actualWeeks = Math.max(weeksForDirectHours, weeksForTotalHours, minWeeks);
  return Math.ceil(actualWeeks / 4.33);
}

export function generateTimeline(input: ScenarioInput): ScenarioResult {
  const phases: TimelinePhase[] = [];
  const milestones: Milestone[] = [];
  
  let currentDate = new Date(input.finishSonography);
  
  if (input.workAsSonographer && input.workMonths > 0) {
    const endDate = addMonths(currentDate, input.workMonths);
    phases.push({
      type: "work",
      startDate: new Date(currentDate),
      endDate: endDate,
      label: `Work as Sonographer (${input.workMonths} months)`,
      color: phaseColors.work
    });
    
    milestones.push({
      date: endDate,
      age: calculateAge(input.birthdate, endDate),
      label: "Finish Sonography Work",
      description: `Complete ${input.workMonths} months of work experience`,
      icon: "💼"
    });
    
    currentDate = endDate;
  }
  
  if (input.travelMonths > 0) {
    const endDate = addMonths(currentDate, input.travelMonths);
    phases.push({
      type: "travel",
      startDate: new Date(currentDate),
      endDate: endDate,
      label: `Travel Break (${input.travelMonths} months)`,
      color: phaseColors.travel
    });
    
    milestones.push({
      date: endDate,
      age: calculateAge(input.birthdate, endDate),
      label: "Return from Travel",
      description: `Complete ${input.travelMonths} months of travel`,
      icon: "✈️"
    });
    
    currentDate = endDate;
  }
  
  const mastersStart = findNextSeptember(currentDate);
  const mastersEnd = addMonths(mastersStart, input.programLength);
  
  phases.push({
    type: "masters",
    startDate: mastersStart,
    endDate: mastersEnd,
    label: `Master's Program (${input.programLength} months)`,
    color: phaseColors.masters,
    description: input.allowRemoteCoursework ? "Remote coursework available" : "On-campus required"
  });
  
  milestones.push({
    date: mastersStart,
    age: calculateAge(input.birthdate, mastersStart),
    label: "Start Master's Program",
    description: `Begin ${input.license} program in ${input.state}`,
    icon: "📚"
  });
  
  milestones.push({
    date: mastersEnd,
    age: calculateAge(input.birthdate, mastersEnd),
    label: "Graduate Master's",
    description: `Complete ${input.license} degree`,
    icon: "🎓"
  });
  
  currentDate = mastersEnd;
  
  const residencyMonths = calculateResidencyDuration(
    input.state,
    input.license,
    input.hoursPerWeek,
    input.directClientRatio
  );
  
  const residencyEnd = addMonths(currentDate, residencyMonths);
  const requirements = licenseRules[input.state as keyof typeof licenseRules]?.[input.license as keyof typeof licenseRules["CA"]];
  
  phases.push({
    type: "residency",
    startDate: new Date(currentDate),
    endDate: residencyEnd,
    label: `${requirements?.associateTitle || "Residency"} (${residencyMonths} months)`,
    color: phaseColors.residency,
    description: `${requirements?.totalHours || 3000} supervised hours at ${input.hoursPerWeek} hrs/week`
  });
  
  milestones.push({
    date: currentDate,
    age: calculateAge(input.birthdate, currentDate),
    label: `Begin ${requirements?.associateTitle || "Residency"}`,
    description: `Start supervised practice`,
    icon: "👩‍⚕️"
  });
  
  const licenseDate = addMonths(residencyEnd, 2);
  
  phases.push({
    type: "licensed",
    startDate: residencyEnd,
    endDate: licenseDate,
    label: "Exam & Licensure",
    color: phaseColors.licensed
  });
  
  milestones.push({
    date: licenseDate,
    age: calculateAge(input.birthdate, licenseDate),
    label: `Licensed ${input.license}`,
    description: `Fully licensed to practice independently`,
    icon: "🏆"
  });
  
  return {
    input,
    phases,
    milestones,
    totalMonths: differenceInMonths(licenseDate, input.finishSonography),
    licenseDate,
    ageAtLicense: calculateAge(input.birthdate, licenseDate)
  };
}