import { useState } from "react";
import { LetterForm } from "@/components/LetterForm";
import { TimelineResults } from "@/components/TimelineResults";
import type { ScenarioInput, ScenarioResult } from "@/types";
import { generateTimeline } from "@/lib/timeline";

function App() {
  const [result, setResult] = useState<ScenarioResult | null>(null);

  const handleScenarioSubmit = (input: ScenarioInput) => {
    const timelineResult = generateTimeline(input);
    setResult(timelineResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {!result ? (
          <LetterForm onSubmit={handleScenarioSubmit} />
        ) : (
          <TimelineResults result={result} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;