// src/components/forms/FamilyMemberForm.tsx
import React, { useState } from "react";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { FamilyMember } from "@/types";

interface FamilyMemberFormProps {
  familyMembers: FamilyMember[];
  onAddFamilyMember: (member: FamilyMember) => void;
  onUpdateFamilyMember: (index: number, member: FamilyMember) => void;
  onRemoveFamilyMember: (index: number) => void;
}

export const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  familyMembers,
  onAddFamilyMember,
  onRemoveFamilyMember,
}) => {
  const [newMember, setNewMember] = useState<FamilyMember>({
    id: "",
    age: 40,
    lifeExpectancy: 85,
    annualIncome: 0,
    annualExpenses: 0,
    philanthropicInterest: 0.5,
    causeAreas: [],
    timeCommitment: 0,
    successorFlag: false,
  });

  const [causeArea, setCauseArea] = useState("");

  const handleAddMember = () => {
    if (newMember.id) {
      onAddFamilyMember(newMember);
      setNewMember({
        id: "",
        age: 40,
        lifeExpectancy: 85,
        annualIncome: 0,
        annualExpenses: 0,
        philanthropicInterest: 0.5,
        causeAreas: [],
        timeCommitment: 0,
        successorFlag: false,
      });
      setCauseArea("");
    }
  };

  const updateNewMemberField = (
    field: keyof FamilyMember,
    value: FamilyMember[keyof FamilyMember]
  ) => {
    setNewMember((prev) => ({ ...prev, [field]: value }));
  };

  const addCauseArea = () => {
    if (causeArea) {
      setNewMember((prev) => ({
        ...prev,
        causeAreas: [...prev.causeAreas, causeArea],
      }));
      setCauseArea("");
    }
  };

  const removeCauseArea = (index: number) => {
    setNewMember((prev) => ({
      ...prev,
      causeAreas: prev.causeAreas.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card title="Family Members">
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Add New Family Member</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Identifier" htmlFor="newMemberId">
            <Input
              id="newMemberId"
              value={newMember.id}
              onChange={(e) => updateNewMemberField("id", e.target.value)}
              placeholder="e.g., Founder, Child-1"
            />
          </FormField>

          <FormField label="Age" htmlFor="newMemberAge">
            <Input
              id="newMemberAge"
              type="number"
              value={newMember.age}
              min={0}
              max={120}
              onChange={(e) =>
                updateNewMemberField("age", parseInt(e.target.value))
              }
            />
          </FormField>

          <FormField label="Life Expectancy" htmlFor="newMemberLifeExpectancy">
            <Input
              id="newMemberLifeExpectancy"
              type="number"
              value={newMember.lifeExpectancy}
              min={0}
              max={120}
              onChange={(e) =>
                updateNewMemberField("lifeExpectancy", parseInt(e.target.value))
              }
            />
          </FormField>

          <FormField label="Annual Income ($)" htmlFor="newMemberIncome">
            <Input
              id="newMemberIncome"
              type="number"
              value={newMember.annualIncome}
              min={0}
              onChange={(e) =>
                updateNewMemberField("annualIncome", parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField label="Annual Expenses ($)" htmlFor="newMemberExpenses">
            <Input
              id="newMemberExpenses"
              type="number"
              value={newMember.annualExpenses}
              min={0}
              onChange={(e) =>
                updateNewMemberField(
                  "annualExpenses",
                  parseFloat(e.target.value)
                )
              }
            />
          </FormField>

          <FormField
            label="Philanthropic Interest (0-1)"
            htmlFor="newMemberPhilanthropicInterest"
            description="0 = Not interested, 1 = Very interested"
          >
            <Input
              id="newMemberPhilanthropicInterest"
              type="number"
              value={newMember.philanthropicInterest}
              min={0}
              max={1}
              step={0.1}
              onChange={(e) =>
                updateNewMemberField(
                  "philanthropicInterest",
                  parseFloat(e.target.value)
                )
              }
            />
          </FormField>

          <FormField
            label="Time Commitment (hours/year)"
            htmlFor="newMemberTimeCommitment"
          >
            <Input
              id="newMemberTimeCommitment"
              type="number"
              value={newMember.timeCommitment}
              min={0}
              onChange={(e) =>
                updateNewMemberField(
                  "timeCommitment",
                  parseFloat(e.target.value)
                )
              }
            />
          </FormField>

          <FormField label="Successor" htmlFor="newMemberSuccessorFlag">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newMemberSuccessorFlag"
                checked={newMember.successorFlag}
                onCheckedChange={(checked) =>
                  updateNewMemberField("successorFlag", checked)
                }
              />
              <label
                htmlFor="newMemberSuccessorFlag"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Designated as successor
              </label>
            </div>
          </FormField>

          <div className="col-span-2">
            <FormField label="Cause Areas" htmlFor="newMemberCauseArea">
              <div className="flex">
                <Input
                  id="newMemberCauseArea"
                  value={causeArea}
                  onChange={(e) => setCauseArea(e.target.value)}
                  placeholder="e.g., Education"
                  className="mr-2"
                />
                <Button type="button" onClick={addCauseArea}>
                  Add
                </Button>
              </div>
            </FormField>

            {newMember.causeAreas.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {newMember.causeAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-primary-100 text-primary-800 px-2 py-1 rounded-md flex items-center"
                  >
                    <span>{area}</span>
                    <button
                      type="button"
                      className="ml-2 text-primary-600 hover:text-primary-800"
                      onClick={() => removeCauseArea(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Button type="button" onClick={handleAddMember}>
            Add Family Member
          </Button>
        </div>
      </div>

      {familyMembers.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-4">Current Family Members</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Income
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Successor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {familyMembers.map((member, index) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${member.annualIncome.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(member.philanthropicInterest * 100).toFixed(0)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.successorFlag ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onRemoveFamilyMember(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
};
