import { useState } from "react";
import { LetterForm } from "@/components/LetterForm";
import { TimelineResults } from "@/components/TimelineResults";
import { ScenarioComparison } from "@/components/ScenarioComparison";
import type { ScenarioInput, ScenarioResult } from "@/types";
import { generateTimeline } from "@/lib/timeline";

function App() {
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [compareMode, setCompareMode] = useState(false);

  const handleScenarioSubmit = (input: ScenarioInput) => {
    const timelineResult = generateTimeline(input);
    setResult(timelineResult);
  };

  const handleReset = () => {
    setResult(null);
    setCompareMode(false);
  };

  const handleCompare = () => {
    setCompareMode(true);
  };

  const handleBackToSingle = () => {
    setCompareMode(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {!result ? (
          <LetterForm onSubmit={handleScenarioSubmit} />
        ) : compareMode ? (
          <ScenarioComparison primaryResult={result} onBack={handleBackToSingle} />
        ) : (
          <TimelineResults result={result} onReset={handleReset} onCompare={handleCompare} />
        )}
      </div>
    </div>
  );
}

export default App;