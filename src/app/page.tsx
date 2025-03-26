// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { SimulationConfigForm } from "@/components/forms/SimulationConfigForm";
import { PhilanthropicSimulationConfig, SimulationResult } from "@/types";
import { runPhilanthropyLegacyMonteCarlo } from "@/lib/legacy";
import { Hero } from "../components/sections/Hero";
import { SimulationResults } from "@/components/sections/SimulationResults";
import { UserGuide } from "@/components/sections/UserGuide";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

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
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm p-4">
        <Tabs defaultValue="simulation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="simulation"
              className="tab-inactive data-[state=active]:tab-active"
            >
              Run Simulation
            </TabsTrigger>
            <TabsTrigger
              value="guide"
              className="tab-inactive data-[state=active]:tab-active"
            >
              User Guide
            </TabsTrigger>
          </TabsList>
          <TabsContent value="simulation" className="mt-0">
            <SimulationConfigForm onSubmit={handleSubmit} />

            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Running simulation...</p>
              </div>
            )}

            {simulationResult && (
              <SimulationResults result={simulationResult} />
            )}
          </TabsContent>
          <TabsContent value="guide" className="mt-0">
            <UserGuide />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
