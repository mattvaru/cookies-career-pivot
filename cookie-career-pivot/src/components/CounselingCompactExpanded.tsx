import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, MapPin } from "lucide-react";
import type { State } from "@/types";

interface CounselingCompactExpandedProps {
  state: State;
  licenseType: string;
}

export function CounselingCompactExpanded({ state, licenseType }: CounselingCompactExpandedProps) {
  // Only show for LPC/LPCC license types
  if (licenseType !== "LPC" && licenseType !== "LPCC") {
    return null;
  }

  const compactStates = [
    { code: "AL", name: "Alabama" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "DC", name: "District of Columbia" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" }
  ];

  const isCompactState = compactStates.some(s => s.code === state);
  const selectedStateName = state === "VA" ? "Virginia" : state === "OK" ? "Oklahoma" : state === "SC" ? "South Carolina" : "California";

  // Show for LPC/LPCC in Compact states OR California
  if (!isCompactState && state !== "CA") {
    return null;
  }

  // Different styling and content for California
  if (state === "CA") {
    return (
      <Card className="w-full border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm my-8">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Globe className="w-6 h-6" />
            🌐 California & The Counseling Compact: Future Possibilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3">
            <Globe className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-4">
              <p className="text-blue-700">
                California isn't part of the <strong>Counseling Compact</strong> yet, but there's exciting potential on the horizon for your LPCC license.
              </p>

              <div className="space-y-4">
                <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🏛️ Legislative Progress (AB 2566)</h4>
                  <ul className="text-sm text-blue-700 space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>A bill has been introduced to make California a Counseling Compact member state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>It's actively moving through the California legislature</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>If passed, it would give your LPCC license portability across all Compact states</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Why this matters for your timeline:</h4>
                  <ul className="text-sm text-blue-700 space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Timing advantage:</strong> By the time you're licensed (~2032), California may have joined the Compact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Future flexibility:</strong> You could gain access to practice across 42+ states and DC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Travel opportunities:</strong> Even with California as your base, you could work remotely with clients in other states</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Current Compact States ({compactStates.length} + DC):
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs text-blue-700">
                    {compactStates.map((state) => (
                      <div key={state.code} className="text-blue-600">
                        {state.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-blue-600 mt-3 font-medium">
                    + California (potentially by the time you're licensed!)
                  </p>
                </div>

                <div className="text-xs bg-white p-3 rounded border border-blue-300">
                  <p className="text-blue-800">
                    <strong>💡 Strategic advantage:</strong> Even if California doesn't join immediately, choosing LPCC gives you the best chance 
                    for future portability if you ever want to practice in other states or provide telehealth services nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Original compact state content
  return (
    <Card className="w-full border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-sm my-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-emerald-800">
          <Globe className="w-6 h-6" />
          🌐 The Counseling Compact: Your License Portability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-4">
            <p className="text-emerald-700">
              <strong>Great choice!</strong> {selectedStateName} is a member of the <strong>Counseling Compact</strong>, 
              which means your LPC license will have incredible portability across the United States.
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-emerald-800 mb-2">What this means for your career:</h4>
                <ul className="text-sm text-emerald-700 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span><strong>Multi-state practice:</strong> Work with clients across all Compact states without getting separate licenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span><strong>Telehealth freedom:</strong> Provide online therapy to clients in any Compact state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span><strong>Easy relocation:</strong> Move between states without licensing headaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span><strong>Travel opportunities:</strong> Take temporary positions or provide services while traveling</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-100 rounded-lg p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  All {compactStates.length} Counseling Compact States:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs text-emerald-700">
                  {compactStates.map((state) => (
                    <div key={state.code} className={`${
                      state.code === selectedStateName.slice(0, 2).toUpperCase() || 
                      (state.code === "VA" && selectedStateName === "Virginia") ||
                      (state.code === "OK" && selectedStateName === "Oklahoma") ||
                      (state.code === "SC" && selectedStateName === "South Carolina")
                        ? "font-semibold bg-emerald-200 px-2 py-1 rounded" 
                        : ""
                    }`}>
                      {state.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs bg-white p-3 rounded border border-emerald-300">
                <p className="text-emerald-800">
                  <strong>💡 Pro tip:</strong> The Counseling Compact launched in 2025 and continues expanding. 
                  By the time you're licensed, even more states may have joined, giving you even greater flexibility!
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}