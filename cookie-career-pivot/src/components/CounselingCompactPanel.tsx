import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Info, Globe } from "lucide-react";
import type { State } from "@/types";

interface CounselingCompactPanelProps {
  state: State;
  licenseType: string;
}

export function CounselingCompactPanel({ state, licenseType }: CounselingCompactPanelProps) {
  console.log("CounselingCompactPanel - state:", state, "licenseType:", licenseType);
  
  // Only show for LPC/LPCC license types
  if (licenseType !== "LPC" && licenseType !== "LPCC") {
    console.log("Not showing panel - wrong license type");
    return null;
  }

  const compactStates = ["VA", "OK", "SC"];
  const isCompactState = compactStates.includes(state);

  if (isCompactState) {
    return (
      <Card className="w-full border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800 text-lg">
                  🌐 The Counseling Compact (LPC Portability)
                </h3>
              </div>
              
              <div className="text-sm text-emerald-700 space-y-2">
                <div className="bg-emerald-200 rounded p-2 mb-3 border border-emerald-300">
                  <p className="text-xs font-medium text-emerald-800">
                    <strong>What's the Counseling Compact?</strong> An interstate agreement that allows fully licensed LPCs to practice across member states without obtaining separate licenses in each state.
                  </p>
                </div>
                
                <p>
                  <strong>Great news!</strong> {state === "VA" ? "Virginia" : state === "OK" ? "Oklahoma" : "South Carolina"} is a member state, which means your LPC license will work across all Compact states.
                </p>
                
                <div className="space-y-1">
                  <p><strong>What this means for you:</strong></p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li><strong>Portability:</strong> Your LPC license works across 39+ states plus Washington, D.C.</li>
                    <li><strong>Telehealth freedom:</strong> Practice remotely with clients in other Compact states</li>
                    <li><strong>Easier relocation:</strong> Move between states without licensing headaches</li>
                    <li><strong>Goes live in 2025:</strong> The system is being finalized now</li>
                  </ul>
                </div>

                <p className="text-xs bg-emerald-100 p-2 rounded border border-emerald-200">
                  💡 <strong>Bottom line:</strong> Choosing an LPC path in a Compact state gives you maximum flexibility and options down the road!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    // Non-compact state (CA)
    return (
      <Card className="w-full border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800 text-lg">
                  🌐 The Counseling Compact & California
                </h3>
              </div>
              
              <div className="text-sm text-blue-700 space-y-2">
                <div className="bg-blue-200 rounded p-2 mb-3 border border-blue-300">
                  <p className="text-xs font-medium text-blue-800">
                    <strong>What's the Counseling Compact?</strong> An interstate agreement that allows fully licensed LPCs to practice across member states without obtaining separate licenses in each state.
                  </p>
                </div>
                
                <p>
                  California hasn't joined the <strong>Counseling Compact</strong> yet, but there's hope on the horizon.
                </p>
                
                <div className="space-y-1">
                  <p><strong>Will California join the Compact?</strong></p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>A bill (AB 2566) has been introduced to make CA a Member State</li>
                    <li>It's currently moving through the legislature—so a "yes" is possible!</li>
                    <li>If it passes, it would significantly widen your portability options for LPC</li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <p><strong>Why this still matters for planning:</strong></p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>VA, OK, and SC are already Compact members with stronger cross-state flexibility</li>
                    <li>Even if CA joins later, being licensed in a Compact state first means easier practice across multiple states sooner</li>
                    <li>The Compact covers 39+ states plus D.C.—that's a lot of portability!</li>
                  </ul>
                </div>

                <p className="text-xs bg-blue-100 p-2 rounded border border-blue-200">
                  💡 <strong>Consider this:</strong> Your potential paths in VA, OK, and SC give you stronger cross-state flexibility if you're considering the LPC route.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}