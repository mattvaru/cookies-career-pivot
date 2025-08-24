import type { State } from "@/types";

export interface GraduateProgram {
  school: string;
  schoolUrl: string;
  program: string;
  remote: string;
  duration: string;
  whyGreat: string;
}

export const graduatePrograms: Record<State, GraduateProgram[]> = {
  CA: [
    {
      school: "Pepperdine University (GSEP)",
      schoolUrl: "https://www.pepperdine.edu/academics/graduate-school-education-psychology/academics/ma-psychology/",
      program: "M.A. Clinical Psychology (LMFT emphasis; LPCC eligible)",
      remote: "Online coursework + local practicum",
      duration: "~2 years (full-time)",
      whyGreat: "Great if you want **flexibility** and the option to pursue LMFT or LPCC in California, without worrying about missing CA-specific coursework."
    },
    {
      school: "CSU Northridge (CSUN)",
      schoolUrl: "https://tsengcollege.csun.edu/programs/MSW",
      program: "Master of Social Work (LCSW path)",
      remote: "Fully online",
      duration: "2 years (full-time) or 3 years (part-time)",
      whyGreat: "Perfect if you want a **CSWE-accredited social work degree** at a state-school price, while studying fully online."
    },
    {
      school: "Palo Alto University (PAU)",
      schoolUrl: "https://www.paloaltou.edu/academic-programs/ma-counseling",
      program: "M.A. Counseling (CACREP) → LPCC/LMFT",
      remote: "Online/hybrid",
      duration: "~2 years and 3 months (9 quarters)",
      whyGreat: "Great if you want a **CACREP-accredited counseling program** (portable to other states) while still being California-aligned."
    }
  ],
  VA: [
    {
      school: "William & Mary",
      schoolUrl: "https://counseling.education.wm.edu/online-programs/masters-of-ed-clinical-mental-health",
      program: "M.Ed. Clinical Mental Health Counseling (LPC)",
      remote: "Online",
      duration: "~3 years (part-time)",
      whyGreat: "Great if you want a **prestigious Virginia program** with CACREP accreditation, designed to be paced sustainably."
    },
    {
      school: "VCU",
      schoolUrl: "https://onlinesocialwork.vcu.edu/",
      program: "Master of Social Work (LCSW path)",
      remote: "Online option",
      duration: "16 months–2 years (FT) or 3–4 years (PT)",
      whyGreat: "Great if you want a **flexible CSWE-accredited MSW** that you can complete on either a fast track or part-time path."
    },
    {
      school: "Liberty University",
      schoolUrl: "https://www.liberty.edu/online/behavioral-sciences/masters/clinical-mental-health-counseling/",
      program: "M.A. Clinical Mental Health Counseling (LPC)",
      remote: "Fully online",
      duration: "~3 years (60 credits)",
      whyGreat: "Great if you want **maximum flexibility** (study anywhere online) and to handle practicum once you're back stateside."
    }
  ],
  OK: [
    {
      school: "University of Oklahoma (OU Online)",
      schoolUrl: "https://online.ou.edu/program/master-of-social-work/",
      program: "Master of Social Work (LCSW path)",
      remote: "Fully online",
      duration: "~15–30 months, depending on track (advanced standing or traditional)",
      whyGreat: "Great if you want a **fast, fully online CSWE-accredited MSW** with options to speed up if eligible."
    },
    {
      school: "Oklahoma State University (OSU)",
      schoolUrl: "https://go.okstate.edu/graduate-academics/programs/masters/counseling-ms.html",
      program: "M.S. in Counseling – Mental Health (LPC)",
      remote: "Campus-based (Stillwater/Tulsa)",
      duration: "~2–3 years (60 credits)",
      whyGreat: "Great if you want to **build Oklahoma roots and get in-person mentorship** while completing a CACREP-accredited LPC program."
    },
    {
      school: "Southeastern Oklahoma State University (SOSU)",
      schoolUrl: "https://www.se.edu/psychology/graduate-programs/ma-clinical-mental-health-counseling/",
      program: "M.A. Clinical Mental Health Counseling (LPC)",
      remote: "Primarily campus-based (Durant)",
      duration: "~2 years (standard MA timeline)",
      whyGreat: "Great if you want an **affordable, CACREP-accredited counseling program** while staying based in Oklahoma."
    }
  ]
};