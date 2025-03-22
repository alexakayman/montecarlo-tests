// src/components/forms/InvestmentStrategiesForm.tsx
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { InvestmentStrategyConfig, AssetClass } from "@/types";

interface InvestmentStrategiesFormProps {
  investmentStrategies: InvestmentStrategyConfig[];
  onUpdateStrategy: (index: number, strategy: InvestmentStrategyConfig) => void;
}

export const InvestmentStrategiesForm: React.FC<
  InvestmentStrategiesFormProps
> = ({ investmentStrategies, onUpdateStrategy }) => {
  const assetClasses: AssetClass[] = [
    "equity",
    "fixedIncome",
    "privateEquity",
    "realEstate",
    "hedge",
    "cash",
  ];

  const formatAssetClassName = (assetClass: string): string => {
    return assetClass
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const handleStrategyChange = (
    strategyIndex: number,
    field: keyof InvestmentStrategyConfig,
    value: InvestmentStrategyConfig[keyof InvestmentStrategyConfig]
  ) => {
    const strategy = { ...investmentStrategies[strategyIndex] };
    (strategy[field] as InvestmentStrategyConfig[typeof field]) = value;
    onUpdateStrategy(strategyIndex, strategy);
  };

  const handleAssetAllocationChange = (
    strategyIndex: number,
    assetClass: AssetClass,
    value: number
  ) => {
    const strategy = { ...investmentStrategies[strategyIndex] };
    const newAllocation = { ...strategy.assetAllocation, [assetClass]: value };

    // Normalize to ensure sum equals 1
    const sum = Object.values(newAllocation).reduce((a, b) => a + b, 0);
    if (sum > 0) {
      const normalizedAllocation: Record<AssetClass, number> = Object.keys(
        newAllocation
      ).reduce(
        (acc, key) => ({
          ...acc,
          [key as AssetClass]: newAllocation[key as AssetClass] / sum,
        }),
        {} as Record<AssetClass, number>
      );

      strategy.assetAllocation = normalizedAllocation;
    } else {
      strategy.assetAllocation = newAllocation;
    }

    onUpdateStrategy(strategyIndex, strategy);
  };

  return (
    <Card title="Investment Strategies">
      <Tabs defaultValue={investmentStrategies[0]?.name} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
          {investmentStrategies.map((strategy) => (
            <TabsTrigger
              key={strategy.name}
              value={strategy.name}
              className="capitalize"
            >
              {strategy.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {investmentStrategies.map((strategy, index) => (
          <TabsContent key={strategy.name} value={strategy.name}>
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-4">
                {strategy.name.charAt(0).toUpperCase() + strategy.name.slice(1)}{" "}
                Strategy
              </h4>

              <div className="mb-6">
                <h5 className="text-md font-medium mb-2">Asset Allocation</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assetClasses.map((assetClass) => (
                    <FormField
                      key={assetClass}
                      name={`${strategy.name}.${assetClass}`}
                      render={() => (
                        <FormItem>
                          <FormLabel>{`${formatAssetClassName(
                            assetClass
                          )} (%)`}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={Math.round(
                                strategy.assetAllocation[assetClass] * 100
                              )}
                              min={0}
                              max={100}
                              onChange={(e) =>
                                handleAssetAllocationChange(
                                  index,
                                  assetClass,
                                  parseInt(e.target.value) / 100
                                )
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="mt-4 p-3 bg-muted rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total:</span>
                    <span
                      className={`text-sm font-bold ${
                        Math.abs(
                          Object.values(strategy.assetAllocation).reduce(
                            (sum, val) => sum + val,
                            0
                          ) - 1
                        ) > 0.001
                          ? "text-destructive"
                          : "text-success"
                      }`}
                    >
                      {(
                        Object.values(strategy.assetAllocation).reduce(
                          (sum, val) => sum + val,
                          0
                        ) * 100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name={`${strategy.name}.esgPercentage`}
                  render={() => (
                    <FormItem>
                      <FormLabel>ESG Percentage (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={Math.round(strategy.esgPercentage * 100)}
                          min={0}
                          max={100}
                          onChange={(e) =>
                            handleStrategyChange(
                              index,
                              "esgPercentage",
                              parseInt(e.target.value) / 100
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Percentage allocated to ESG investments
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`${strategy.name}.impactPercentage`}
                  render={() => (
                    <FormItem>
                      <FormLabel>Impact Percentage (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={Math.round(strategy.impactPercentage * 100)}
                          min={0}
                          max={100}
                          onChange={(e) =>
                            handleStrategyChange(
                              index,
                              "impactPercentage",
                              parseInt(e.target.value) / 100
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Percentage allocated to impact investments
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
