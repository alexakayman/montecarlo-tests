// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { SimulationConfigForm } from "@/components/forms/SimulationConfigForm";
import { PhilanthropicSimulationConfig, SimulationResult } from "@/types";
import { runPhilanthropyLegacyMonteCarlo } from "@/lib/legacy";
import { Hero } from "../components/sections/Hero";
import { SimulationResults } from "@/components/sections/SimulationResults";

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <SimulationConfigForm onSubmit={handleSubmit} />

        {isLoading && (
          <div className="mt-8 text-center">
            <p>Running simulation...</p>
          </div>
        )}

        {simulationResult && <SimulationResults result={simulationResult} />}
      </div>
    </main>
  );
}
