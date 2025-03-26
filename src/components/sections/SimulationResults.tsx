import { SimulationResult } from "@/types";
import { FinancialChart } from "./FinancialChart";

interface SimulationResultsProps {
  result: SimulationResult;
}

export function SimulationResults({ result }: SimulationResultsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Simulation Results
      </h2>
      <FinancialChart result={result} />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Philanthropic Impact</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${result.philanthropicImpact.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Calculated based on total charitable distributions, impact
            investments, and ESG-aligned assets
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Family Wealth</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${result.familyWealth.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Net present value of family assets after philanthropic allocations
            and taxes
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Sustainability Score</h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.sustainabilityScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on ESG alignment, impact investments, and long-term financial
            viability
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">
            Philanthropic Capital Deployed
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            ${result.philanthropicCapitalDeployed.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total amount allocated to charitable vehicles and impact investments
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Successor Readiness</h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.successorReadiness * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on successor policy, governance structure, and family member
            preparation
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Family Engagement</h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.familyEngagementScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Calculated from family member involvement, time commitment, and
            philanthropic interest
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Failure Rate</h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.failureRate * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Probability of portfolio depletion based on Monte Carlo simulations
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">
            Optimal Withdrawal Rate
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.optimalWithdrawalRate * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Maximum sustainable withdrawal rate based on asset allocation and
            market conditions
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">
            Perpetuity Probability
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.perpetuityProbability * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Likelihood of maintaining real purchasing power over multiple
            generations
          </p>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold text-gray-700">Balance Score</h3>
          <p className="text-2xl font-bold text-gray-900">
            {(result.balanceScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Overall measure of balance between family wealth preservation and
            philanthropic impact
          </p>
        </div>
      </div>
    </div>
  );
}
