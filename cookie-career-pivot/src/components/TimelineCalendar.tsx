import { useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, eachMonthOfInterval, getYear } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ScenarioResult } from "@/types";

interface TimelineCalendarProps {
  result: ScenarioResult;
}

export function TimelineCalendar({ result }: TimelineCalendarProps) {
  const { phases, input } = result;
  
  if (phases.length === 0) return null;

  const startDate = phases[0].startDate;
  const endDate = phases[phases.length - 1].endDate;
  
  // Calculate months to display (pad a bit before and after)
  const displayStart = addMonths(startOfMonth(startDate), -1);
  const displayEnd = addMonths(endOfMonth(endDate), 1);
  const allMonths = eachMonthOfInterval({ start: displayStart, end: displayEnd });
  
  const [currentYear, setCurrentYear] = useState(getYear(startDate));
  const yearMonths = allMonths.filter(month => getYear(month) === currentYear);
  
  const availableYears = Array.from(new Set(allMonths.map(month => getYear(month)))).sort();

  // Calculate time per country for travel phase
  const travelPhase = phases.find(p => p.type === "travel");
  const timePerCountry = travelPhase && input.travelCountries.length > 0 
    ? Math.floor(input.travelMonths / input.travelCountries.length) 
    : 0;

  const getPhaseForMonth = (monthDate: Date) => {
    return phases.find(phase => 
      monthDate >= startOfMonth(phase.startDate) && monthDate <= endOfMonth(phase.endDate)
    );
  };

  const getTravelCountryForMonth = (monthDate: Date) => {
    if (!travelPhase || input.travelCountries.length === 0) return null;
    
    const monthsSinceTravel = Math.floor(
      (monthDate.getTime() - travelPhase.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );
    
    if (monthsSinceTravel < 0 || monthsSinceTravel >= input.travelMonths) return null;
    
    const countryIndex = Math.floor(monthsSinceTravel / Math.max(timePerCountry, 1));
    return input.travelCountries[Math.min(countryIndex, input.travelCountries.length - 1)];
  };

  const getPhaseColor = (phase: any) => {
    switch (phase?.type) {
      case "travel": return "bg-sky-200 border-sky-400";
      case "work": return "bg-gray-200 border-gray-400";
      case "masters": return "bg-emerald-200 border-emerald-400";
      case "residency": return "bg-amber-200 border-amber-400";
      case "licensed": return "bg-rose-200 border-rose-400";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Timeline Calendar</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentYear(Math.max(currentYear - 1, availableYears[0]))}
            disabled={currentYear <= availableYears[0]}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xl font-semibold text-gray-800 min-w-[80px] text-center">
            {currentYear}
          </span>
          <button
            onClick={() => setCurrentYear(Math.min(currentYear + 1, availableYears[availableYears.length - 1]))}
            disabled={currentYear >= availableYears[availableYears.length - 1]}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {yearMonths.map((monthDate, index) => {
          const phase = getPhaseForMonth(monthDate);
          const travelCountry = getTravelCountryForMonth(monthDate);
          const isCurrentPhase = phase && monthDate >= startOfMonth(phase.startDate) && monthDate <= endOfMonth(phase.endDate);
          
          return (
            <div
              key={index}
              className={`
                p-3 rounded-lg border-2 transition-all hover:shadow-md
                ${isCurrentPhase ? getPhaseColor(phase) : "bg-gray-50 border-gray-200"}
                ${isCurrentPhase ? "opacity-100" : "opacity-40"}
              `}
              title={phase ? `${phase.label}${travelCountry ? ` - ${travelCountry.name}` : ''}` : ''}
            >
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-800 mb-1">
                  {format(monthDate, "MMM")}
                </div>
                {isCurrentPhase && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600 capitalize">
                      {phase.type}
                    </div>
                    {travelCountry && (
                      <div className="flex flex-col items-center">
                        <span className="text-lg">{travelCountry.flag}</span>
                        <span className="text-xs text-gray-600 leading-tight">
                          {travelCountry.name}
                        </span>
                        {timePerCountry > 0 && (
                          <span className="text-xs text-gray-500">
                            ~{timePerCountry}mo
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-sky-200 border border-sky-400"></div>
            <span>Travel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200 border border-gray-400"></div>
            <span>Work</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-200 border border-emerald-400"></div>
            <span>Master's</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-200 border border-amber-400"></div>
            <span>Residency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-rose-200 border border-rose-400"></div>
            <span>Licensed</span>
          </div>
        </div>
        
        {input.travelCountries.length > 0 && timePerCountry > 0 && (
          <div className="mt-3 text-xs text-gray-600">
            <strong>Travel Distribution:</strong> ~{timePerCountry} months per country 
            ({input.travelMonths} months ÷ {input.travelCountries.length} countries)
          </div>
        )}
      </div>
    </div>
  );
}