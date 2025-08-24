import type { TimelinePhase } from "@/types";
import { getYear, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  phases: TimelinePhase[];
}

export function CalendarGrid({ phases }: CalendarGridProps) {
  if (phases.length === 0) return null;

  const startDate = phases[0].startDate;
  const endDate = phases[phases.length - 1].endDate;
  
  const startYear = getYear(startDate);
  const endYear = getYear(endDate);
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const getPhaseForMonth = (year: number, month: number) => {
    const monthStart = startOfMonth(new Date(year, month));
    const monthEnd = endOfMonth(new Date(year, month));
    
    return phases.find(phase => 
      isWithinInterval(monthStart, { start: phase.startDate, end: phase.endDate }) ||
      isWithinInterval(monthEnd, { start: phase.startDate, end: phase.endDate }) ||
      (phase.startDate <= monthStart && phase.endDate >= monthEnd)
    );
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Calendar View</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-13 gap-1 mb-2">
            <div className="text-xs font-semibold text-gray-600">Year</div>
            {months.map(month => (
              <div key={month} className="text-xs font-semibold text-center text-gray-600">
                {month}
              </div>
            ))}
          </div>
          
          {years.map(year => (
            <div key={year} className="grid grid-cols-13 gap-1 mb-1">
              <div className="text-sm font-semibold text-gray-700 flex items-center">
                {year}
              </div>
              {months.map((_, monthIndex) => {
                const phase = getPhaseForMonth(year, monthIndex);
                const monthDate = new Date(year, monthIndex);
                const isBeforeStart = monthDate < startDate;
                const isAfterEnd = monthDate > endDate;
                
                return (
                  <div
                    key={monthIndex}
                    className={cn(
                      "h-8 rounded border transition-all",
                      phase ? phase.color : "bg-gray-50 border-gray-200",
                      isBeforeStart || isAfterEnd ? "opacity-30" : "",
                      phase && "hover:opacity-80 cursor-pointer"
                    )}
                    title={phase ? `${phase.label}` : ""}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4">
        {Array.from(new Set(phases.map(p => p.type))).map(type => {
          const phase = phases.find(p => p.type === type);
          if (!phase) return null;
          
          return (
            <div key={type} className="flex items-center gap-2">
              <div className={cn("w-4 h-4 rounded border-2", phase.color)} />
              <span className="text-sm text-gray-600 capitalize">{type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}