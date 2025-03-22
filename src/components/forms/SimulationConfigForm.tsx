import React from "react";
import { useForm } from "react-hook-form";
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
import {
  WithdrawalStrategy,
  PhilanthropicSimulationConfig,
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
      // Include required properties with default values
      assets: [],
      charitableVehicles: [],
      familyMembers: [],
      legacyPlan: {
        missionStatement: "",
        sunsetting: false,
        successorPolicy: "familyOnly",
        minimumFamilyInvolvement: 0.5,
        governanceStructure: "familyBoard",
        impactMeasurementFramework: "",
        primaryCharitableEntity: "privateFoundation",
        philanthropicPercentage: 0.5,
      },
      investmentStrategies: defaultInvestmentStrategies,
      correlationMatrix: defaultCorrelationMatrix,
    },
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
                      <SelectItem value="endowmentModel">
                        Endowment Model
                      </SelectItem>
                      <SelectItem value="percentOfAssets">
                        Percent of Assets
                      </SelectItem>
                      <SelectItem value="inflationAdjusted">
                        Inflation Adjusted
                      </SelectItem>
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
