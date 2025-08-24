import { useState } from "react";
import { format } from "date-fns";
import { LetterForm } from "@/components/LetterForm";
import { TimelineCalendar } from "@/components/TimelineCalendar";
import type { ScenarioInput, ScenarioResult } from "@/types";
import { generateTimeline } from "@/lib/timeline";
import { getStateName } from "@/data/states";

interface ScenarioComparisonProps {
  primaryResult: ScenarioResult;
  onBack: () => void;
}

export function ScenarioComparison({ primaryResult, onBack }: ScenarioComparisonProps) {
  const [secondaryResults, setSecondaryResults] = useState<ScenarioResult[]>([]);
  const [showForm, setShowForm] = useState(true);

  // Safety check
  if (!primaryResult) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-8">
          <p className="text-gray-600">Error loading comparison. Please go back and try again.</p>
          <button
            onClick={onBack}
            className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddScenario = (input: ScenarioInput) => {
    const result = generateTimeline(input);
    setSecondaryResults([...secondaryResults, result]);
    setShowForm(false);
  };

  const handleAddAnother = () => {
    if (secondaryResults.length < 2) {
      setShowForm(true);
    }
  };

  const removeScenario = (index: number) => {
    setSecondaryResults(secondaryResults.filter((_, i) => i !== index));
  };

  const allResults = [primaryResult, ...secondaryResults];

  const getComparisonSummary = () => {
    if (secondaryResults.length === 0) return null;

    const comparisons = secondaryResults.map((result, index) => {
      if (!result || !result.ageAtLicense || !primaryResult || !primaryResult.ageAtLicense) {
        return null;
      }
      
      const ageDiff = result.ageAtLicense - primaryResult.ageAtLicense;
      const monthsDiff = Math.round(ageDiff * 12);
      
      return {
        index: index + 2,
        name: `${getStateName(result.input.state)} ${result.input.license}`,
        ageDiff,
        monthsDiff,
        ageAtLicense: result.ageAtLicense,
        faster: monthsDiff < 0,
        slower: monthsDiff > 0
      };
    }).filter(Boolean);

    return comparisons.length > 0 ? comparisons : null;
  };

  const comparisons = getComparisonSummary();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">
          Compare Your Paths
        </h1>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 underline"
        >
          ← Back to single view
        </button>
      </div>

      {showForm ? (
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Let's build scenario #{secondaryResults.length + 2}
          </h2>
          <p className="text-gray-600 mb-6">
            Try different states, licenses, or travel plans to see how they compare.
          </p>
          <LetterForm onSubmit={handleAddScenario} />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Comparison Summary */}
          {comparisons && comparisons.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comparisons.map((comp, index) => comp && (
                  <div key={index} className="bg-white rounded p-4 border">
                    <div className="font-semibold text-gray-800 mb-2">
                      Path {comp.index}: {comp.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Licensed at age {Math.floor(comp.ageAtLicense)}
                    </div>
                    {comp.faster && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        ✓ {Math.abs(comp.monthsDiff)} months faster
                      </div>
                    )}
                    {comp.slower && (
                      <div className="text-sm text-orange-600 font-medium mt-1">
                        ⚡ {comp.monthsDiff} months longer
                      </div>
                    )}
                    {!comp.faster && !comp.slower && (
                      <div className="text-sm text-gray-500 font-medium mt-1">
                        ≈ Same timeline
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Side-by-side scenarios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {allResults.map((result, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Path {index + 1}: {getStateName(result.input.state)} {result.input.license}
                    </h3>
                    {index > 0 && (
                      <button
                        onClick={() => removeScenario(index - 1)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Licensed at age <strong>{Math.floor(result.ageAtLicense)}</strong> in{" "}
                    <strong>{format(result.licenseDate, "MMMM yyyy")}</strong>
                  </div>
                  
                  {/* Key details */}
                  <div className="mt-4 space-y-2 text-xs text-gray-500">
                    {result.input.travelMonths > 0 && (
                      <div>Travel: {result.input.travelMonths} months</div>
                    )}
                    {result.input.workAsSonographer && (
                      <div>Work: {result.input.workMonths} months</div>
                    )}
                    <div>Program: {result.input.programLength} months</div>
                    <div>Residency: {result.input.hoursPerWeek} hrs/week</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-xs font-medium text-gray-700 mb-3">Timeline Overview</div>
                  <div className="space-y-2">
                    {result.phases.map((phase, phaseIndex) => (
                      <div key={phaseIndex} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 rounded ${
                          phase.type === "travel" ? "bg-sky-400" :
                          phase.type === "work" ? "bg-gray-400" :
                          phase.type === "masters" ? "bg-emerald-400" :
                          phase.type === "residency" ? "bg-amber-400" :
                          "bg-rose-400"
                        }`} />
                        <span className="flex-1 text-gray-600">{phase.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar View */}
          <div className="space-y-8">
            {allResults.map((result, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Path {index + 1}: {getStateName(result.input.state)} {result.input.license} Calendar
                </h3>
                <TimelineCalendar result={result} />
              </div>
            ))}
          </div>

          {/* Add more scenarios */}
          {secondaryResults.length < 2 && (
            <div className="text-center py-8">
              <button
                onClick={handleAddAnother}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                + Add Another Scenario
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}