import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { ScenarioInput, State, LicenseType } from "@/types";
import { Calendar, MapPin, Briefcase, GraduationCap, Clock, Plane } from "lucide-react";

interface ScenarioFormProps {
  onSubmit: (input: ScenarioInput) => void;
}

export function ScenarioForm({ onSubmit }: ScenarioFormProps) {
  const [formData, setFormData] = useState<ScenarioInput>({
    state: "CA",
    license: "LMFT",
    birthdate: new Date("2000-03-23"),
    finishSonography: new Date("2026-05-08"),
    travelMonths: 6,
    workAsSonographer: false,
    workMonths: 0,
    programLength: 24,
    hoursPerWeek: 25,
    directClientRatio: 0.6,
    allowRemoteCoursework: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-purple-50">
      <CardHeader className="pb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="w-7 h-7" />
          Build Your Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                State
              </Label>
              <Select
                value={formData.state}
                onValueChange={(value: State) => setFormData({ ...formData, state: value })}
              >
                <SelectTrigger className="bg-white border-purple-200 focus:border-purple-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="OK">Oklahoma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="license" className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                License Type
              </Label>
              <Select
                value={formData.license}
                onValueChange={(value: LicenseType) => setFormData({ ...formData, license: value })}
              >
                <SelectTrigger className="bg-white border-purple-200 focus:border-purple-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LMFT">LMFT - Marriage & Family</SelectItem>
                  <SelectItem value="LPC">LPC - Professional Counselor</SelectItem>
                  {formData.state === "CA" && <SelectItem value="LPCC">LPCC - Clinical Counselor</SelectItem>}
                  <SelectItem value="LCSW">LCSW - Clinical Social Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-600" />
              Travel Break: {formData.travelMonths} months
            </Label>
            <Slider
              value={[formData.travelMonths]}
              onValueChange={(value) => setFormData({ ...formData, travelMonths: value[0] })}
              min={0}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>No travel</span>
              <span>2 years</span>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-600" />
                Work as Sonographer First
              </Label>
              <Switch
                checked={formData.workAsSonographer}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, workAsSonographer: checked, workMonths: checked ? 6 : 0 })
                }
              />
            </div>
            
            {formData.workAsSonographer && (
              <div className="space-y-2 mt-3">
                <Label className="text-xs text-gray-600">
                  Work Duration: {formData.workMonths} months
                </Label>
                <Slider
                  value={[formData.workMonths]}
                  onValueChange={(value) => setFormData({ ...formData, workMonths: value[0] })}
                  min={0}
                  max={24}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="space-y-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              Master's Program Length: {formData.programLength} months
            </Label>
            <Slider
              value={[formData.programLength]}
              onValueChange={(value) => setFormData({ ...formData, programLength: value[0] })}
              min={18}
              max={36}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>18 months</span>
              <span>3 years</span>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Residency Hours/Week: {formData.hoursPerWeek}
            </Label>
            <Slider
              value={[formData.hoursPerWeek]}
              onValueChange={(value) => setFormData({ ...formData, hoursPerWeek: value[0] })}
              min={15}
              max={40}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Part-time (15)</span>
              <span>Full-time (40)</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Allow Remote Coursework
            </Label>
            <Switch
              checked={formData.allowRemoteCoursework}
              onCheckedChange={(checked) => setFormData({ ...formData, allowRemoteCoursework: checked })}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg shadow-lg"
          >
            Generate My Timeline
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}