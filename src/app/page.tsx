// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { SimulationConfigForm } from "@/components/forms/SimulationConfigForm";
import { PhilanthropicSimulationConfig, SimulationResult } from "@/types";
import { runPhilanthropyLegacyMonteCarlo } from "@/lib/legacy";

export default function Home() {
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: PhilanthropicSimulationConfig) => {
    setIsLoading(true);
    try {
      const result = runPhilanthropyLegacyMonteCarlo(data);
      setSimulationResult(result);
    } catch (error) {
      console.error("Error running simulation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">
          Philanthropic Legacy Simulation
        </h1>

        <SimulationConfigForm onSubmit={handleSubmit} />

        {isLoading && (
          <div className="mt-8 text-center">
            <p>Running simulation...</p>
          </div>
        )}

        {simulationResult && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Simulation Results</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Philanthropic Impact</h3>
                <p>${simulationResult.philanthropicImpact.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Family Wealth</h3>
                <p>${simulationResult.familyWealth.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Sustainability Score</h3>
                <p>
                  {(simulationResult.sustainabilityScore * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Philanthropic Capital Deployed
                </h3>
                <p>
                  $
                  {simulationResult.philanthropicCapitalDeployed.toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Successor Readiness</h3>
                <p>{(simulationResult.successorReadiness * 100).toFixed(1)}%</p>
              </div>
              <div>
                <h3 className="font-semibold">Family Engagement</h3>
                <p>
                  {(simulationResult.familyEngagementScore * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Failure Rate</h3>
                <p>{(simulationResult.failureRate * 100).toFixed(1)}%</p>
              </div>
              <div>
                <h3 className="font-semibold">Optimal Withdrawal Rate</h3>
                <p>
                  {(simulationResult.optimalWithdrawalRate * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Perpetuity Probability</h3>
                <p>
                  {(simulationResult.perpetuityProbability * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Balance Score</h3>
                <p>{(simulationResult.balanceScore * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
