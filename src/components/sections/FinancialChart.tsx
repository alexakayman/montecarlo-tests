import { SimulationResult } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FinancialChartProps {
  result: SimulationResult;
}

export function FinancialChart({ result }: FinancialChartProps) {
  // Generate data points for the chart
  const data = Array.from({ length: 30 }, (_, index) => {
    const year = index + 1;
    const familyWealth = result.familyWealth * Math.pow(1.05, year); // Assuming 5% growth
    const philanthropicCapital =
      result.philanthropicCapitalDeployed * Math.pow(1.05, year);

    return {
      year,
      familyWealth,
      philanthropicCapital,
    };
  });

  return (
    <div className="mt-8">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              label={{ value: "Years", position: "bottom" }}
            />
            <YAxis
              label={{
                value: "Value ($)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(value: number) => [
                `$${(value / 1000000).toFixed(1)}M`,
                "",
              ]}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend verticalAlign="top" align="right" />
            <Line
              type="monotone"
              dataKey="familyWealth"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Family Wealth"
            />
            <Line
              type="monotone"
              dataKey="philanthropicCapital"
              stroke="#059669"
              strokeWidth={2}
              dot={false}
              name="Philanthropic Capital"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Projected growth of family wealth and philanthropic capital over 30
        years
      </p>
    </div>
  );
}
