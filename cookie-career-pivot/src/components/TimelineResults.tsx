import { format } from "date-fns";
import type { ScenarioResult } from "@/types";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";
import { TimelineCalendar } from "@/components/TimelineCalendar";
import { ProgramTable } from "@/components/ProgramTable";
import { CounselingCompactExpanded } from "@/components/CounselingCompactExpanded";
import { LPCBenefitsPanel } from "@/components/LPCBenefitsPanel";
import { licenseRules } from "@/data/rules";
import { getStateName } from "@/data/states";

interface TimelineResultsProps {
  result: ScenarioResult;
  onReset: () => void;
  onCompare: () => void;
}

export function TimelineResults({ result, onReset, onCompare }: TimelineResultsProps) {
  const { phases, milestones, ageAtLicense, licenseDate, input } = result;
  
  const keyMilestones = milestones.filter(m => 
    m.label.includes("Graduate") || 
    m.label.includes("Licensed") || 
    m.label.includes("Start Master")
  );

  const stateRules = licenseRules[input.state]?.[input.license];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">
          Cookie's Timeline ({input.license}, {getStateName(input.state)})
        </h1>
        <button
          onClick={onReset}
          className="text-gray-600 hover:text-gray-900 underline"
        >
          ← Start over
        </button>
      </div>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
        <p>
          Here's your path mapped out — you're going to be 
          <span className="inline-flex items-center px-3 py-1 mx-1 bg-rose-100 border-2 border-rose-300 rounded-full font-medium text-base">
            {Math.floor(ageAtLicense)} years old
          </span>
          when you get your <GlossaryTooltip term={input.license}>{input.license}</GlossaryTooltip> license in 
          <span className="inline-flex items-center px-3 py-1 mx-1 bg-blue-100 border-2 border-blue-300 rounded-full font-medium text-base">
            {format(licenseDate, "MMMM yyyy")}
          </span>.
        </p>


        {stateRules && (
          <div className="bg-gray-50 rounded-lg p-6 my-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {getStateName(input.state)} <GlossaryTooltip term={input.license}>{input.license}</GlossaryTooltip> Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Hours:</span> {stateRules.totalHours.toLocaleString()}
              </div>
              <div>
                <span className="font-medium"><GlossaryTooltip term="Direct Client Hours">Direct Client Hours</GlossaryTooltip>:</span> {stateRules.directHours.toLocaleString()}
              </div>
              <div>
                <span className="font-medium"><GlossaryTooltip term="Supervision Hours">Supervision Hours</GlossaryTooltip>:</span> {stateRules.supervisionHours.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Minimum Weeks:</span> {stateRules.minWeeks}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium"><GlossaryTooltip term="Associate">Associate Title</GlossaryTooltip>:</span> {stateRules.associateTitle}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Required Exams:</span> {stateRules.examRequirements.join(", ")}
              </div>
            </div>
          </div>
        )}

        <CounselingCompactExpanded state={input.state} licenseType={input.license} />

        <LPCBenefitsPanel state={input.state} licenseType={input.license} />

        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-6">The Journey</h2>
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center gap-4 py-3">
                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  phase.type === "travel" ? "bg-sky-400" :
                  phase.type === "work" ? "bg-gray-400" :
                  phase.type === "masters" ? "bg-emerald-400" :
                  phase.type === "residency" ? "bg-amber-400" :
                  "bg-rose-400"
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{phase.label}</div>
                  <div className="text-sm text-gray-600">
                    {format(phase.startDate, "MMM yyyy")} — {format(phase.endDate, "MMM yyyy")}
                  </div>
                  {phase.description && (
                    <div className="text-sm text-gray-500">{phase.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Key Milestones</h2>
          <div className="grid gap-6">
            {keyMilestones.map((milestone, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{milestone.label}</h3>
                    <p className="text-gray-600 mb-2">{milestone.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(milestone.date, "MMMM yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.floor(milestone.age)}
                    </div>
                    <div className="text-xs text-gray-500">years old</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-12">
          <TimelineCalendar result={result} />
        </div>

        <div className="my-12">
          <ProgramTable />
        </div>

        <div className="bg-gray-50 rounded-lg p-8 my-12">
          <h2 className="text-xl font-semibold mb-4">The Bottom Line</h2>
          <div className="flex items-start gap-6 mb-8">
            <p className="text-lg flex-1">
              Even with all the travel and breathing room you want, you'll be fully licensed 
              as a <GlossaryTooltip term={input.license}>{input.license}</GlossaryTooltip> before you turn {Math.floor(ageAtLicense) + 1}. You're young and you're going to be A-OK -- my friend thinks so too :)
            </p>
            <div className="flex-shrink-0">
              <img 
                src="/Conclusion Pic.png" 
                alt="Supportive message" 
                className="w-48 h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Want to explore other paths?</h3>
            <p className="text-gray-600 mb-4">
              Compare this timeline with different states, licenses, or travel plans to see which path feels right.
            </p>
            <button
              onClick={onCompare}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Compare Another Scenario →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}