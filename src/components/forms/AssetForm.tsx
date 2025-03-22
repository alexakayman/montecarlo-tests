// src/components/forms/AssetForm.tsx
import React, { useState } from "react";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Asset, AssetClass } from "@/types";

interface AssetFormProps {
  assets: Asset[];
  onAddAsset: (asset: Asset) => void;
  onRemoveAsset: (index: number) => void;
}

export const AssetForm: React.FC<AssetFormProps> = ({
  assets,
  onAddAsset,
  onRemoveAsset,
}) => {
  const [newAsset, setNewAsset] = useState<Asset>({
    id: "",
    assetClass: "equity",
    currentValue: 0,
    annualReturn: 0.07,
    annualVolatility: 0.15,
    correlationGroup: 1,
    esgAligned: false,
    impactFocused: false,
  });

  const assetClassOptions = [
    { value: "equity", label: "Equity" },
    { value: "fixedIncome", label: "Fixed Income" },
    { value: "privateEquity", label: "Private Equity" },
    { value: "realEstate", label: "Real Estate" },
    { value: "hedge", label: "Hedge Fund" },
    { value: "cash", label: "Cash" },
  ];

  const handleAddAsset = () => {
    if (newAsset.id && newAsset.currentValue > 0) {
      onAddAsset(newAsset);
      setNewAsset({
        id: "",
        assetClass: "equity",
        currentValue: 0,
        annualReturn: 0.07,
        annualVolatility: 0.15,
        correlationGroup: 1,
        esgAligned: false,
        impactFocused: false,
      });
    }
  };

  const updateNewAssetField = (
    field: keyof Asset,
    value: Asset[keyof Asset]
  ) => {
    setNewAsset((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card title="Assets">
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Add New Asset</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Asset Identifier" htmlFor="newAssetId">
            <Input
              id="newAssetId"
              value={newAsset.id}
              onChange={(e) => updateNewAssetField("id", e.target.value)}
              placeholder="e.g., US-Equity-Portfolio"
            />
          </FormField>

          <FormField label="Asset Class" htmlFor="newAssetClass">
            <Select
              value={newAsset.assetClass}
              onValueChange={(value) =>
                updateNewAssetField("assetClass", value as AssetClass)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset class" />
              </SelectTrigger>
              <SelectContent>
                {assetClassOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Current Value ($)" htmlFor="newAssetValue">
            <Input
              id="newAssetValue"
              type="number"
              value={newAsset.currentValue}
              min={0}
              onChange={(e) =>
                updateNewAssetField("currentValue", parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField label="Annual Return" htmlFor="newAssetReturn">
            <Input
              id="newAssetReturn"
              type="number"
              value={newAsset.annualReturn}
              min={-1}
              max={1}
              step={0.001}
              onChange={(e) =>
                updateNewAssetField("annualReturn", parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField label="Annual Volatility" htmlFor="newAssetVolatility">
            <Input
              id="newAssetVolatility"
              type="number"
              value={newAsset.annualVolatility}
              min={0}
              max={1}
              step={0.001}
              onChange={(e) =>
                updateNewAssetField(
                  "annualVolatility",
                  parseFloat(e.target.value)
                )
              }
            />
          </FormField>

          <FormField
            label="Correlation Group"
            htmlFor="newAssetCorrelationGroup"
          >
            <Input
              id="newAssetCorrelationGroup"
              type="number"
              value={newAsset.correlationGroup}
              min={1}
              max={10}
              onChange={(e) =>
                updateNewAssetField(
                  "correlationGroup",
                  parseInt(e.target.value)
                )
              }
            />
          </FormField>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <FormField label="ESG Aligned" htmlFor="newAssetEsgAligned">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newAssetEsgAligned"
                  checked={newAsset.esgAligned}
                  onCheckedChange={(checked) =>
                    updateNewAssetField("esgAligned", checked)
                  }
                />
                <label htmlFor="newAssetEsgAligned">ESG Aligned</label>
              </div>
            </FormField>

            <FormField label="Impact Focused" htmlFor="newAssetImpactFocused">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newAssetImpactFocused"
                  checked={newAsset.impactFocused}
                  onCheckedChange={(checked) =>
                    updateNewAssetField("impactFocused", checked)
                  }
                />
                <label htmlFor="newAssetImpactFocused">Impact Focused</label>
              </div>
            </FormField>
          </div>
        </div>

        <div className="mt-4">
          <Button type="button" onClick={handleAddAsset}>
            Add Asset
          </Button>
        </div>
      </div>

      {assets.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-4">Current Assets</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volatility
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ESG
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.map((asset, index) => (
                  <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {asset.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.assetClass}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${asset.currentValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(asset.annualReturn * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(asset.annualVolatility * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.esgAligned ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.impactFocused ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onRemoveAsset(index)}
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
