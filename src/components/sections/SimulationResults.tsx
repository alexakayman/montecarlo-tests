import { SimulationResult } from "@/types";

interface SimulationResultsProps {
  result: SimulationResult;
}

export function SimulationResults({ result }: SimulationResultsProps) {
  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Simulation Results</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Philanthropic Impact</h3>
          <p className="text-white">
            ${result.philanthropicImpact.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Calculated based on total charitable distributions, impact
            investments, and ESG-aligned assets
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Family Wealth</h3>
          <p className="text-white">${result.familyWealth.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">
            Net present value of family assets after philanthropic allocations
            and taxes
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Sustainability Score</h3>
          <p className="text-white">
            {(result.sustainabilityScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Based on ESG alignment, impact investments, and long-term financial
            viability
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">
            Philanthropic Capital Deployed
          </h3>
          <p className="text-white">
            ${result.philanthropicCapitalDeployed.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Total amount allocated to charitable vehicles and impact investments
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Successor Readiness</h3>
          <p className="text-white">
            {(result.successorReadiness * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Based on successor policy, governance structure, and family member
            preparation
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Family Engagement</h3>
          <p className="text-white">
            {(result.familyEngagementScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Calculated from family member involvement, time commitment, and
            philanthropic interest
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Failure Rate</h3>
          <p className="text-white">{(result.failureRate * 100).toFixed(1)}%</p>
          <p className="text-sm text-gray-400 mt-1">
            Probability of portfolio depletion based on Monte Carlo simulations
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">
            Optimal Withdrawal Rate
          </h3>
          <p className="text-white">
            {(result.optimalWithdrawalRate * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Maximum sustainable withdrawal rate based on asset allocation and
            market conditions
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">
            Perpetuity Probability
          </h3>
          <p className="text-white">
            {(result.perpetuityProbability * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Likelihood of maintaining real purchasing power over multiple
            generations
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-200">Balance Score</h3>
          <p className="text-white">
            {(result.balanceScore * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Overall measure of balance between family wealth preservation and
            philanthropic impact
          </p>
        </div>
      </div>
    </div>
  );
}
