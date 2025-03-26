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
import { z } from "zod";

// Define Zod schema for Asset
const assetSchema = z.object({
  id: z
    .string()
    .min(1, "Asset ID is required")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Asset ID can only contain letters, numbers, and hyphens"
    ),
  assetClass: z.enum([
    "equity",
    "fixedIncome",
    "privateEquity",
    "realEstate",
    "hedge",
    "cash",
  ] as const),
  currentValue: z
    .number()
    .positive("Current value must be greater than 0")
    .finite("Current value must be a finite number"),
  annualReturn: z
    .number()
    .min(-1, "Annual return must be between -100% and 100%")
    .max(1, "Annual return must be between -100% and 100%"),
  annualVolatility: z
    .number()
    .min(0, "Annual volatility must be between 0% and 100%")
    .max(1, "Annual volatility must be between 0% and 100%"),
  correlationGroup: z
    .number()
    .int("Correlation group must be an integer")
    .min(1, "Correlation group must be between 1 and 10")
    .max(10, "Correlation group must be between 1 and 10"),
  esgAligned: z.boolean(),
  impactFocused: z.boolean(),
});

type AssetFormData = z.infer<typeof assetSchema>;

interface AssetFormProps {
  assets: Asset[];
  onAddAsset: (asset: Asset) => void;
  onRemoveAsset: (index: number) => void;
}

interface FormErrors {
  id?: string;
  currentValue?: string;
  annualReturn?: string;
  annualVolatility?: string;
  correlationGroup?: string;
}

export const AssetForm: React.FC<AssetFormProps> = ({
  assets,
  onAddAsset,
  onRemoveAsset,
}) => {
  const [newAsset, setNewAsset] = useState<AssetFormData>({
    id: "",
    assetClass: "equity",
    currentValue: 0,
    annualReturn: 0.07,
    annualVolatility: 0.15,
    correlationGroup: 1,
    esgAligned: false,
    impactFocused: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [displayValues, setDisplayValues] = useState({
    annualReturn: 7,
    annualVolatility: 15,
  });

  const assetClassOptions = [
    { value: "equity", label: "Equity" },
    { value: "fixedIncome", label: "Fixed Income" },
    { value: "privateEquity", label: "Private Equity" },
    { value: "realEstate", label: "Real Estate" },
    { value: "hedge", label: "Hedge Fund" },
    { value: "cash", label: "Cash" },
  ];

  const validateForm = (): boolean => {
    try {
      // Check for duplicate ID
      if (assets.some((asset) => asset.id === newAsset.id)) {
        setErrors((prev) => ({ ...prev, id: "Asset ID must be unique" }));
        return false;
      }

      // Validate using Zod schema
      assetSchema.parse(newAsset);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          if (field) {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateField = (
    field: keyof AssetFormData,
    value: AssetFormData[keyof AssetFormData]
  ): string | undefined => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({
        [field]: assetSchema.shape[field],
      });

      // Validate just this field
      fieldSchema.parse({ [field]: value });
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return undefined;
    }
  };

  const handleAddAsset = () => {
    if (validateForm()) {
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
      setDisplayValues({
        annualReturn: 7,
        annualVolatility: 15,
      });
      setErrors({});
    }
  };

  const updateNewAssetField = (
    field: keyof AssetFormData,
    value: AssetFormData[keyof AssetFormData]
  ) => {
    setNewAsset((prev) => ({ ...prev, [field]: value }));

    // Validate the specific field
    const fieldError = validateField(field, value);
    if (fieldError) {
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    } else {
      // Clear error for this field
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Also check for duplicate ID if that's the field being updated
    if (field === "id" && value) {
      if (assets.some((asset) => asset.id === value)) {
        setErrors((prev) => ({ ...prev, id: "Asset ID must be unique" }));
      }
    }
  };

  const handlePercentageChange = (
    field: "annualReturn" | "annualVolatility",
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    // Store the display value (integer percentage)
    setDisplayValues((prev) => ({ ...prev, [field]: numValue }));

    // Convert to decimal for the actual asset value
    const decimalValue = numValue / 100;
    updateNewAssetField(field, decimalValue);
  };

  const handleBlur = (field: keyof AssetFormData) => {
    // Validate the entire form on blur
    validateForm();
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
              onBlur={() => handleBlur("id")}
              placeholder="e.g., US-Equity-Portfolio"
              className={errors.id ? "border-red-500" : ""}
            />
            {errors.id && (
              <p className="text-sm text-red-500 mt-1">{errors.id}</p>
            )}
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
              onBlur={() => handleBlur("currentValue")}
              className={errors.currentValue ? "border-red-500" : ""}
            />
            {errors.currentValue && (
              <p className="text-sm text-red-500 mt-1">{errors.currentValue}</p>
            )}
          </FormField>

          <FormField label="Annual Return (%)" htmlFor="newAssetReturn">
            <Input
              id="newAssetReturn"
              type="number"
              value={displayValues.annualReturn}
              min={-100}
              max={100}
              onChange={(e) =>
                handlePercentageChange("annualReturn", e.target.value)
              }
              onBlur={() => handleBlur("annualReturn")}
              className={errors.annualReturn ? "border-red-500" : ""}
            />
            {errors.annualReturn && (
              <p className="text-sm text-red-500 mt-1">{errors.annualReturn}</p>
            )}
          </FormField>

          <FormField label="Annual Volatility (%)" htmlFor="newAssetVolatility">
            <Input
              id="newAssetVolatility"
              type="number"
              value={displayValues.annualVolatility}
              min={0}
              max={100}
              onChange={(e) =>
                handlePercentageChange("annualVolatility", e.target.value)
              }
              onBlur={() => handleBlur("annualVolatility")}
              className={errors.annualVolatility ? "border-red-500" : ""}
            />
            {errors.annualVolatility && (
              <p className="text-sm text-red-500 mt-1">
                {errors.annualVolatility}
              </p>
            )}
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
              onBlur={() => handleBlur("correlationGroup")}
              className={errors.correlationGroup ? "border-red-500" : ""}
            />
            {errors.correlationGroup && (
              <p className="text-sm text-red-500 mt-1">
                {errors.correlationGroup}
              </p>
            )}
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
