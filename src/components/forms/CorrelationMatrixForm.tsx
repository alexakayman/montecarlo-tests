// src/components/forms/CorrelationMatrixForm.tsx
import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { AssetClass } from "@/types";

interface CorrelationMatrixFormProps {
  correlationMatrix: number[][];
  onUpdateCorrelationMatrix: (matrix: number[][]) => void;
  assetClasses: AssetClass[];
}

export const CorrelationMatrixForm: React.FC<CorrelationMatrixFormProps> = ({
  correlationMatrix,
  onUpdateCorrelationMatrix,
  assetClasses,
}) => {
  const handleMatrixChange = (
    rowIndex: number,
    colIndex: number,
    value: number
  ) => {
    const newMatrix = [...correlationMatrix.map((row) => [...row])];
    newMatrix[rowIndex][colIndex] = value;

    // Ensure matrix symmetry
    if (rowIndex !== colIndex) {
      newMatrix[colIndex][rowIndex] = value;
    }

    onUpdateCorrelationMatrix(newMatrix);
  };

  const resetMatrix = () => {
    const n = assetClasses.length;
    const identityMatrix = Array(n)
      .fill(0)
      .map((_, i) =>
        Array(n)
          .fill(0)
          .map((_, j) => (i === j ? 1 : 0))
      );
    onUpdateCorrelationMatrix(identityMatrix);
  };

  const getAssetClassLabel = (index: number): string => {
    const assetClass = assetClasses[index];
    return assetClass
      ? assetClass.charAt(0).toUpperCase() + assetClass.slice(1)
      : `Asset ${index + 1}`;
  };

  return (
    <Card title="Correlation Matrix">
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">
          Enter correlation values between asset classes (-1 to 1):
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetMatrix}
          className="mb-4"
        >
          Reset to Identity Matrix
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset Class
              </th>
              {assetClasses.map((_, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {getAssetClassLabel(index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {correlationMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getAssetClassLabel(rowIndex)}
                </td>
                {row.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {rowIndex === colIndex ? (
                      // Diagonal elements are always 1
                      <span className="px-3 py-1 bg-gray-100 rounded">
                        1.00
                      </span>
                    ) : (
                      <input
                        type="number"
                        value={value}
                        min={-1}
                        max={1}
                        step={0.05}
                        onChange={(e) =>
                          handleMatrixChange(
                            rowIndex,
                            colIndex,
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
