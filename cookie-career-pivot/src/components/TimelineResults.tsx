import { format } from "date-fns";
import type { ScenarioResult } from "@/types";

interface TimelineResultsProps {
  result: ScenarioResult;
  onReset: () => void;
}

export function TimelineResults({ result, onReset }: TimelineResultsProps) {
  const { phases, milestones, ageAtLicense, licenseDate } = result;
  
  const keyMilestones = milestones.filter(m => 
    m.label.includes("Graduate") || 
    m.label.includes("Licensed") || 
    m.label.includes("Start Master")
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">
          Your Timeline
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
          Alright Cookie, here's your path mapped out. Take a deep breath — you're going to be 
          <span className="inline-flex items-center px-3 py-1 mx-1 bg-rose-100 border-2 border-rose-300 rounded-full font-medium text-base">
            {Math.floor(ageAtLicense)} years old
          </span>
          when you get your license in 
          <span className="inline-flex items-center px-3 py-1 mx-1 bg-blue-100 border-2 border-blue-300 rounded-full font-medium text-base">
            {format(licenseDate, "MMMM yyyy")}
          </span>.
        </p>

        <p>
          That means you'll have <strong>decades</strong> of meaningful work ahead of you. 
          You're not behind — you're right on time.
        </p>

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

        <div className="bg-gray-50 rounded-lg p-8 my-12">
          <h2 className="text-xl font-semibold mb-4">The Bottom Line</h2>
          <p className="text-lg">
            Even with all the travel and breathing room you want, you'll be fully licensed 
            as a therapist before you turn {Math.floor(ageAtLicense) + 1}. That's not late — 
            that's exactly when you're supposed to be there.
          </p>
          <p className="text-gray-600 mt-4">
            The experiences you gather along the way — travel, work, life — will make you 
            a better therapist than someone who rushed through. Trust your timeline.
          </p>
        </div>

        <div className="text-sm text-gray-500 italic pt-8 border-t border-gray-200">
          Remember: There's no rush. Your future clients will benefit from everything 
          you learn along the way.
        </div>
      </div>
    </div>
  );
}