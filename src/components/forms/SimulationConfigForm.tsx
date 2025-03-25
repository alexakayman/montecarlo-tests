import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  PhilanthropicSimulationConfig,
  Asset,
  CharitableVehicle,
  FamilyMember,
  AssetClassValues,
  CharitableVehicleTypeValues,
  InvestmentStrategyValues,
  SuccessorPolicyValues,
  GovernanceStructureValues,
  WithdrawalStrategyValues,
  defaultInvestmentStrategies,
  defaultCorrelationMatrix,
} from "@/types";

interface SimulationConfigFormProps {
  onSubmit: (data: PhilanthropicSimulationConfig) => void;
}

export function SimulationConfigForm({ onSubmit }: SimulationConfigFormProps) {
  const form = useForm<PhilanthropicSimulationConfig>({
    defaultValues: {
      simulationYears: 30,
      simulationRuns: 1000,
      withdrawalStrategy: "endowmentModel",
      baseWithdrawalRate: 0.04,
      inflationRate: 0.02,
      familyGrowthRate: 0.01,
      taxRate: 0.35,
      philanthropicAllocation: 0.5,
      familyAllocation: 0.5,
      impactPremium: 0.02,
      assets: [
        {
          id: "asset1",
          assetClass: "equity",
          currentValue: 1000000,
          annualReturn: 0.07,
          annualVolatility: 0.18,
          correlationGroup: 1,
          esgAligned: true,
          impactFocused: false,
        },
      ],
      charitableVehicles: [
        {
          id: "vehicle1",
          type: "privateFoundation",
          currentValue: 500000,
          annualContribution: 50000,
          annualAdminCosts: 0.01,
          distributionRequirement: 0.05,
          investmentStrategy: "balanced",
          familyInvolvement: 100,
          missionStatement: "Supporting education and healthcare initiatives",
          causeAreas: ["education", "healthcare"],
        },
      ],
      familyMembers: [
        {
          id: "member1",
          age: 45,
          lifeExpectancy: 85,
          annualIncome: 200000,
          annualExpenses: 150000,
          philanthropicInterest: 0.8,
          timeCommitment: 100,
          successorFlag: true,
          causeAreas: ["education", "healthcare"],
        },
      ],
      legacyPlan: {
        missionStatement: "Building a sustainable philanthropic legacy",
        sunsetting: false,
        successorPolicy: "familyOnly",
        minimumFamilyInvolvement: 0.5,
        governanceStructure: "familyBoard",
        impactMeasurementFramework: "SDG-based",
        primaryCharitableEntity: "privateFoundation",
        philanthropicPercentage: 0.5,
      },
      investmentStrategies: defaultInvestmentStrategies,
      correlationMatrix: defaultCorrelationMatrix,
    },
  });

  const {
    fields: assetFields,
    append: appendAsset,
    remove: removeAsset,
  } = useFieldArray({
    control: form.control,
    name: "assets",
  });

  const {
    fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    control: form.control,
    name: "charitableVehicles",
  });

  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control: form.control,
    name: "familyMembers",
  });

  const handleSubmit = (data: PhilanthropicSimulationConfig) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Simulation Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="simulationYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Simulation Years</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Number of years to simulate</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="simulationRuns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Simulation Runs</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of Monte Carlo simulations to run
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Assets</h2>
          {assetFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
              <FormField
                control={form.control}
                name={`assets.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.assetClass`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AssetClassValues).map((ac) => (
                          <SelectItem key={ac} value={ac}>
                            {ac}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.currentValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.annualReturn`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Return (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.annualVolatility`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Volatility (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.correlationGroup`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correlation Group</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.esgAligned`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>ESG Aligned</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`assets.${index}.impactFocused`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Impact Focused</FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => removeAsset(index)}
                className="col-span-2"
              >
                Remove Asset
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              appendAsset({
                id: `asset${assetFields.length + 1}`,
                assetClass: "equity",
                currentValue: 0,
                annualReturn: 0.07,
                annualVolatility: 0.18,
                correlationGroup: 1,
                esgAligned: false,
                impactFocused: false,
                causeAreas: [],
              } as Asset)
            }
          >
            Add Asset
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Charitable Vehicles</h2>
          {vehicleFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CharitableVehicleTypeValues).map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.currentValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.annualContribution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Contribution</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.annualAdminCosts`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Admin Costs (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.distributionRequirement`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distribution Requirement (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.investmentStrategy`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Strategy</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(InvestmentStrategyValues).map(
                          (strategy) => (
                            <SelectItem key={strategy} value={strategy}>
                              {strategy}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.familyInvolvement`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Involvement (hours/year)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`charitableVehicles.${index}.missionStatement`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Mission Statement</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => removeVehicle(index)}
                className="col-span-2"
              >
                Remove Vehicle
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendVehicle({} as CharitableVehicle)}
          >
            Add Charitable Vehicle
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Family Members</h2>
          {memberFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
              <FormField
                control={form.control}
                name={`familyMembers.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.age`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.lifeExpectancy`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Life Expectancy</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.annualIncome`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.annualExpenses`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Expenses</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.philanthropicInterest`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Philanthropic Interest (0-1)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.timeCommitment`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Commitment (hours/year)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyMembers.${index}.successorFlag`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Successor Flag</FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => removeMember(index)}
                className="col-span-2"
              >
                Remove Member
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendMember({} as FamilyMember)}
          >
            Add Family Member
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Legacy Plan</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="legacyPlan.missionStatement"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Mission Statement</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.sunsetting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Sunsetting</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.successorPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Successor Policy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select successor policy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(SuccessorPolicyValues).map((policy) => (
                        <SelectItem key={policy} value={policy}>
                          {policy}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.minimumFamilyInvolvement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Family Involvement (hours/year)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.governanceStructure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Governance Structure</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select governance structure" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(GovernanceStructureValues).map(
                        (structure) => (
                          <SelectItem key={structure} value={structure}>
                            {structure}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.impactMeasurementFramework"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impact Measurement Framework</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.primaryCharitableEntity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Charitable Entity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary entity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CharitableVehicleTypeValues).map(
                        (type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legacyPlan.philanthropicPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Philanthropic Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Withdrawal Strategy</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="withdrawalStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strategy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select withdrawal strategy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(WithdrawalStrategyValues).map(
                        (strategy) => (
                          <SelectItem key={strategy} value={strategy}>
                            {strategy}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how to calculate annual withdrawals
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseWithdrawalRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Withdrawal Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Annual withdrawal rate as percentage of assets
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Economic Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="inflationRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inflation Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Expected annual inflation rate
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Effective tax rate for calculations
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Allocation Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="philanthropicAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Philanthropic Allocation (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Percentage of assets allocated to philanthropy
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Allocation (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Percentage of assets allocated to family
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyGrowthRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Growth Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Expected annual growth in family size
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="impactPremium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impact Premium (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Additional return for impact investments
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Button type="submit" className="w-full">
          Run Simulation
        </Button>
      </form>
    </Form>
  );
}
