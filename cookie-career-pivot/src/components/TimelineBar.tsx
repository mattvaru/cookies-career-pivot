import type { TimelinePhase } from "@/types";
import { format, differenceInMonths } from "date-fns";
import { cn } from "@/lib/utils";

interface TimelineBarProps {
  phases: TimelinePhase[];
}

export function TimelineBar({ phases }: TimelineBarProps) {
  if (phases.length === 0) return null;

  const startDate = phases[0].startDate;
  const endDate = phases[phases.length - 1].endDate;
  const totalMonths = differenceInMonths(endDate, startDate);

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Journey Timeline</h3>
      
      <div className="relative">
        <div className="flex w-full h-20 rounded-lg overflow-hidden shadow-inner bg-gray-50">
          {phases.map((phase, index) => {
            const phaseMonths = differenceInMonths(phase.endDate, phase.startDate);
            const widthPercentage = (phaseMonths / totalMonths) * 100;
            
            return (
              <div
                key={index}
                className={cn(
                  "relative flex items-center justify-center border-r-2 border-white transition-all hover:opacity-90",
                  phase.color
                )}
                style={{ width: `${widthPercentage}%` }}
                title={`${phase.label}: ${format(phase.startDate, "MMM yyyy")} - ${format(phase.endDate, "MMM yyyy")}`}
              >
                <div className="text-xs font-medium text-center px-2 text-gray-700">
                  <div className="font-semibold truncate">{phase.type.charAt(0).toUpperCase() + phase.type.slice(1)}</div>
                  <div className="text-[10px] opacity-75">{phaseMonths} mo</div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{format(startDate, "MMM yyyy")}</span>
          <span>{format(endDate, "MMM yyyy")}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
        {phases.map((phase, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={cn("w-4 h-4 rounded border-2", phase.color)} />
            <span className="text-sm text-gray-600">{phase.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}