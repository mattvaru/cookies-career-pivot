import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";
import { graduatePrograms } from "@/data/programs";
import { stateNames, getStateName } from "@/data/states";
import type { State } from "@/types";

export function ProgramTable() {
  const [selectedState, setSelectedState] = useState<State>("CA");

  const programs = graduatePrograms[selectedState];


  const renderWithTooltips = (text: string) => {
    const parts = text.split(/\b(CACREP|CSWE|LMFT|LPCC|LPC|LCSW|MSW)\b/);
    
    return parts.map((part, index) => {
      const glossaryTerms = ['CACREP', 'CSWE', 'LMFT', 'LPCC', 'LPC', 'LCSW', 'MSW'];
      if (glossaryTerms.includes(part)) {
        return <GlossaryTooltip key={index} term={part}>{part}</GlossaryTooltip>;
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
    });
  };

  return (
    <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Graduate Program Options
      </h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Explore top graduate programs in your target state. Each program is carefully selected 
          for quality, accreditation, and flexibility for your unique situation.
        </p>
        
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            View programs in:
          </label>
          <Select value={selectedState} onValueChange={(value) => setSelectedState(value as State)}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(stateNames).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">School</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Program / Path</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Remote?</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Why it's great for you</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <a 
                    href={program.schoolUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    {program.school}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {renderWithTooltips(program.program)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {program.remote}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {program.duration}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {renderWithTooltips(program.whyGreat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2">Key Notes for {getStateName(selectedState)}:</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• <strong>Remote vs. <GlossaryTooltip term="Practicum">practicum</GlossaryTooltip>:</strong> Coursework may be online, but <GlossaryTooltip term="Practicum">practicum</GlossaryTooltip>/<GlossaryTooltip term="Internship">internship</GlossaryTooltip> must be supervised in the state where you want licensure.</li>
          {selectedState === "CA" && (
            <li>• <strong>California quirks:</strong> If you study outside CA but want to license there, you may need extra CA-specific courses (<GlossaryTooltip term="Law & Ethics Exam">law & ethics</GlossaryTooltip>, domestic violence, aging).</li>
          )}
          <li>• <strong>Accreditation:</strong> <GlossaryTooltip term="CACREP">CACREP</GlossaryTooltip> = gold standard for counseling (<GlossaryTooltip term="LPC">LPC</GlossaryTooltip>/<GlossaryTooltip term="LMFT">LMFT</GlossaryTooltip>/<GlossaryTooltip term="LPCC">LPCC</GlossaryTooltip>), <GlossaryTooltip term="CSWE">CSWE</GlossaryTooltip> = gold standard for social work (<GlossaryTooltip term="MSW">MSW</GlossaryTooltip>/<GlossaryTooltip term="LCSW">LCSW</GlossaryTooltip>)</li>
        </ul>
      </div>
    </div>
  );
}