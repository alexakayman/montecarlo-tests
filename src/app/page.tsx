// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { SimulationConfigForm } from "@/components/forms/SimulationConfigForm";
import { PhilanthropicSimulationConfig, SimulationResult } from "@/types";
import { runPhilanthropyLegacyMonteCarlo } from "@/lib/legacy";
import { Hero } from "../components/sections/Hero";
import { SimulationResults } from "@/components/sections/SimulationResults";
import { UserGuide } from "@/components/sections/UserGuide";

export default function Home() {
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("simulation");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "simulation";
      setActiveSection(hash);
    };

    // Initial hash check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    window.location.hash = section;
  };

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
    <main className="flex min-h-screen flex-col items-center max-w-6xl mx-auto justify-between">
      <Hero onSectionChange={handleSectionChange} />
      <div className="z-10 w-full items-center justify-between text-sm p-4 -mt-30 bg-gradient-to-b from-white to-gray-50">
        {activeSection === "simulation" && (
          <>
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
          </>
        )}
        {activeSection === "guide" && <UserGuide />}
      </div>
    </main>
  );
}
