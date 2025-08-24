import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Heart, MapPin, Users } from "lucide-react";
import type { State } from "@/types";

interface LPCBenefitsPanelProps {
  state: State;
  licenseType: string;
}

export function LPCBenefitsPanel({ state, licenseType }: LPCBenefitsPanelProps) {
  // Only show for non-LPC licenses (LMFT, LCSW)
  if (licenseType === "LPC" || licenseType === "LPCC") {
    return null;
  }

  const stateName = state === "CA" ? "California" : 
                   state === "VA" ? "Virginia" : 
                   state === "OK" ? "Oklahoma" : 
                   "South Carolina";
  
  const isCompactState = ["VA", "OK", "SC"].includes(state);

  return (
    <Card className="w-full border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm my-6">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-3">
            <h4 className="font-medium text-amber-800 text-base">
              💭 Something to consider: LPC flexibility
            </h4>
            
            <p className="text-sm text-amber-700">
              While {licenseType === "LMFT" ? "LMFT" : "LCSW"} is a great path, LPCs have broader scope—you can work with individuals, couples, families, and groups without being limited to specific populations. This might align well with your interests in variety and exploration.
            </p>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-amber-800 text-sm mb-2">Scope & Practice Flexibility</h5>
                <ul className="text-sm text-amber-700 space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Work with any age group: children, teens, adults, elderly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Choose your focus: anxiety, depression, trauma, relationships, addiction, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Adapt your practice as interests evolve—no need to stick to one specialty</span>
                  </li>
                </ul>
              </div>

              {isCompactState && (
                <div className="bg-green-100 rounded p-3 border border-green-200">
                  <h5 className="font-medium text-green-800 text-sm mb-1">Perfect for Your Travel Goals</h5>
                  <p className="text-sm text-green-700">
                    In {stateName}, your LPC license works across 42+ states through the Counseling Compact. You could live anywhere, travel frequently, and still maintain your practice through telehealth with clients across multiple states.
                  </p>
                </div>
              )}

              {state === "CA" && (
                <div className="bg-blue-100 rounded p-3 border border-blue-200">
                  <h5 className="font-medium text-blue-800 text-sm mb-1">California's Future Compact Potential</h5>
                  <p className="text-sm text-blue-700">
                    If California joins the Counseling Compact by the time you're licensed (~2032), your LPCC would have nationwide portability. Even if not, LPCC gives you the best positioning for future flexibility.
                  </p>
                </div>
              )}

              <div>
                <h5 className="font-medium text-amber-800 text-sm mb-2">Why This Might Suit You</h5>
                <ul className="text-sm text-amber-700 space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span><strong>Adventure-ready:</strong> Skills transfer anywhere, perfect for someone planning to explore different places</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span><strong>Growth mindset:</strong> You can constantly learn new approaches without being boxed into one specialty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span><strong>Work-life integration:</strong> Many LPCs successfully combine travel with remote practice</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded p-3 border border-amber-300">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> You can always specialize in family therapy or social work approaches as an LPC—you're not limited. The difference is you'd have broader options and better portability.
                </p>
              </div>
            </div>

            <p className="text-xs text-amber-600">
              Just worth exploring if variety, flexibility, and location independence appeal to you.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}