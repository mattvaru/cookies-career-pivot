import type { State, LicenseType, LicenseRequirements } from "@/types";

export const licenseRules: Record<State, Record<LicenseType, LicenseRequirements>> = {
  CA: {
    LMFT: {
      totalHours: 3000,
      directHours: 1750,
      supervisionHours: 104,
      minWeeks: 104,
      associateTitle: "AMFT",
      examRequirements: ["Law & Ethics Exam", "Clinical Exam"]
    },
    LPCC: {
      totalHours: 3000,
      directHours: 1750,
      supervisionHours: 104,
      minWeeks: 104,
      associateTitle: "APCC",
      examRequirements: ["Law & Ethics Exam", "Clinical Exam"]
    },
    LCSW: {
      totalHours: 3000,
      directHours: 1750,
      supervisionHours: 104,
      minWeeks: 104,
      associateTitle: "ASW",
      examRequirements: ["Law & Ethics Exam", "Clinical Exam"]
    },
    LPC: {
      totalHours: 3000,
      directHours: 1750,
      supervisionHours: 104,
      minWeeks: 104,
      associateTitle: "APCC",
      examRequirements: ["Law & Ethics Exam", "Clinical Exam"]
    }
  },
  VA: {
    LPC: {
      totalHours: 3400,
      directHours: 2000,
      supervisionHours: 200,
      minWeeks: 104,
      associateTitle: "Resident in Counseling",
      examRequirements: ["NCE or NCMHCE"]
    },
    LMFT: {
      totalHours: 3400,
      directHours: 2000,
      supervisionHours: 200,
      minWeeks: 104,
      associateTitle: "Resident in MFT",
      examRequirements: ["AMFTRB Exam"]
    },
    LCSW: {
      totalHours: 3000,
      directHours: 1800,
      supervisionHours: 100,
      minWeeks: 104,
      associateTitle: "Supervisee in Social Work",
      examRequirements: ["ASWB Clinical"]
    },
    LPCC: {
      totalHours: 3400,
      directHours: 2000,
      supervisionHours: 200,
      minWeeks: 104,
      associateTitle: "Resident in Counseling",
      examRequirements: ["NCE or NCMHCE"]
    }
  },
  OK: {
    LPC: {
      totalHours: 3000,
      directHours: 1050,
      supervisionHours: 100,
      minWeeks: 104,
      associateTitle: "LPC Candidate",
      examRequirements: ["NCE", "Oklahoma Jurisprudence"]
    },
    LMFT: {
      totalHours: 3000,
      directHours: 1500,
      supervisionHours: 100,
      minWeeks: 104,
      associateTitle: "LMFT Candidate",
      examRequirements: ["AMFTRB Exam", "Oklahoma Jurisprudence"]
    },
    LCSW: {
      totalHours: 4000,
      directHours: 3000,
      supervisionHours: 100,
      minWeeks: 104,
      associateTitle: "LCSW Supervisee",
      examRequirements: ["ASWB Clinical"]
    },
    LPCC: {
      totalHours: 3000,
      directHours: 1050,
      supervisionHours: 100,
      minWeeks: 104,
      associateTitle: "LPC Candidate",
      examRequirements: ["NCE", "Oklahoma Jurisprudence"]
    }
  },
  SC: {
    LPC: {
      totalHours: 3000,
      directHours: 1500,
      supervisionHours: 150,
      minWeeks: 104,
      associateTitle: "ALC",
      examRequirements: ["NCE"]
    },
    LMFT: {
      totalHours: 1500,
      directHours: 1500,
      supervisionHours: 200,
      minWeeks: 104,
      associateTitle: "Associate MFT",
      examRequirements: ["AMFTRB Exam"]
    },
    LCSW: {
      totalHours: 3000,
      directHours: 1800,
      supervisionHours: 100,
      minWeeks: 104,
      associateTitle: "LISW-Associate",
      examRequirements: ["ASWB Clinical"]
    },
    LPCC: {
      totalHours: 3000,
      directHours: 1500,
      supervisionHours: 150,
      minWeeks: 104,
      associateTitle: "ALC",
      examRequirements: ["NCE"]
    }
  }
};

export const graduateFieldwork = {
  CACREP: {
    practicum: { total: 100, direct: 40 },
    internship: { total: 600, direct: 240 }
  },
  CSWE: {
    fieldwork: { total: 900, direct: 450 }
  }
};

export const phaseColors = {
  work: "bg-gray-200 border-gray-300",
  travel: "bg-sky-200 border-sky-300",
  masters: "bg-emerald-200 border-emerald-300",
  residency: "bg-amber-200 border-amber-300",
  licensed: "bg-rose-200 border-rose-300"
};