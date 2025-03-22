// src/components/forms/LegacyPlanForm.tsx
import React from "react";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import { Card } from "../ui/Card";
import {
  LegacyPlan,
  SuccessorPolicy,
  GovernanceStructure,
  CharitableVehicleType,
} from "@/types";

interface LegacyPlanFormProps {
  legacyPlan: LegacyPlan;
  onChange: (
    field: keyof LegacyPlan,
    value: LegacyPlan[keyof LegacyPlan]
  ) => void;
}

export const LegacyPlanForm: React.FC<LegacyPlanFormProps> = ({
  legacyPlan,
  onChange,
}) => {
  const successorPolicyOptions = [
    { value: "familyOnly", label: "Family Only" },
    { value: "familyAndProfessional", label: "Family and Professional" },
    { value: "professionalOnly", label: "Professional Only" },
  ];

  const governanceStructureOptions = [
    { value: "familyBoard", label: "Family Board" },
    { value: "mixedBoard", label: "Mixed Board" },
    { value: "professionalBoard", label: "Professional Board" },
  ];

  const charitableEntityOptions = [
    { value: "privateFoundation", label: "Private Foundation" },
    { value: "donorAdvisedFund", label: "Donor Advised Fund" },
    { value: "charitableTrust", label: "Charitable Trust" },
  ];

  return (
    <Card title="Legacy Plan">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <FormField label="Mission Statement" htmlFor="missionStatement">
            <Input
              id="missionStatement"
              value={legacyPlan.missionStatement}
              onChange={(e) => onChange("missionStatement", e.target.value)}
              placeholder="Enter your legacy mission statement"
            />
          </FormField>
        </div>

        <FormField label="Sunsetting" htmlFor="sunsetting">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sunsetting"
              checked={legacyPlan.sunsetting}
              onCheckedChange={(checked) => onChange("sunsetting", checked)}
            />
            <label
              htmlFor="sunsetting"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Plan to sunset (vs. exist in perpetuity)
            </label>
          </div>
        </FormField>

        <FormField label="Successor Policy" htmlFor="successorPolicy">
          <Select
            value={legacyPlan.successorPolicy}
            onValueChange={(value) =>
              onChange("successorPolicy", value as SuccessorPolicy)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select successor policy" />
            </SelectTrigger>
            <SelectContent>
              {successorPolicyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Minimum Family Involvement (hours/year)"
          htmlFor="minimumFamilyInvolvement"
        >
          <Input
            id="minimumFamilyInvolvement"
            type="number"
            value={legacyPlan.minimumFamilyInvolvement}
            min={0}
            onChange={(e) =>
              onChange("minimumFamilyInvolvement", parseInt(e.target.value))
            }
          />
        </FormField>

        <FormField label="Governance Structure" htmlFor="governanceStructure">
          <Select
            value={legacyPlan.governanceStructure}
            onValueChange={(value) =>
              onChange("governanceStructure", value as GovernanceStructure)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select governance structure" />
            </SelectTrigger>
            <SelectContent>
              {governanceStructureOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Primary Charitable Entity"
          htmlFor="primaryCharitableEntity"
        >
          <Select
            value={legacyPlan.primaryCharitableEntity}
            onValueChange={(value) =>
              onChange(
                "primaryCharitableEntity",
                value as CharitableVehicleType
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select charitable entity" />
            </SelectTrigger>
            <SelectContent>
              {charitableEntityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Philanthropic Percentage"
          htmlFor="philanthropicPercentage"
          description="Portion of wealth dedicated to philanthropy (0-1)"
        >
          <Input
            id="philanthropicPercentage"
            type="number"
            value={legacyPlan.philanthropicPercentage}
            min={0}
            max={1}
            step={0.01}
            onChange={(e) =>
              onChange("philanthropicPercentage", parseFloat(e.target.value))
            }
          />
        </FormField>

        <div className="col-span-2">
          <FormField
            label="Impact Measurement Framework"
            htmlFor="impactMeasurementFramework"
          >
            <Input
              id="impactMeasurementFramework"
              value={legacyPlan.impactMeasurementFramework}
              onChange={(e) =>
                onChange("impactMeasurementFramework", e.target.value)
              }
              placeholder="Describe your impact measurement approach"
            />
          </FormField>
        </div>
      </div>
    </Card>
  );
};
