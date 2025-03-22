import {
  Asset,
  AssetClass,
  PhilanthropicSimulationConfig,
  SimulationResult,
} from "@/types";

// Random normal distribution generator (Box-Muller transform)
function randomNormal(mean: number, stdDev: number): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * stdDev;
}

// Generate correlated returns for a set of assets
function generateCorrelatedReturns(
  assets: Asset[],
  correlationMatrix: number[][]
): number[] {
  // Map assets to their correlation groups
  const assetGroups = assets.map((asset) => asset.correlationGroup - 1); // 0-based indexing

  // Generate independent normal random variables
  const independentReturns = assets.map(() => randomNormal(0, 1));

  // Apply Cholesky decomposition to generate correlated returns
  const correlatedReturns: number[] = [];

  for (let i = 0; i < assets.length; i++) {
    let correlatedReturn = 0;
    for (let j = 0; j <= i; j++) {
      const correlation = correlationMatrix[assetGroups[i]][assetGroups[j]];
      correlatedReturn += correlation * independentReturns[j];
    }

    // Transform to match the asset's expected return and volatility
    correlatedReturns[i] =
      assets[i].annualReturn + correlatedReturn * assets[i].annualVolatility;
  }

  return correlatedReturns;
}

// Simulate portfolio performance including charitable vehicles
function simulatePortfolioPerformance(
  assets: Asset[],
  charitableVehicles: any[],
  correlationMatrix: number[][],
  simulationYears: number,
  inflationRate: number
): {
  portfolioByYear: number[];
  charitableAssetsByYear: number[];
  distributionsByYear: number[];
  familyAssetsByYear: number[];
} {
  // Initialize results
  const portfolioByYear: number[] = [
    assets.reduce((sum, asset) => sum + asset.currentValue, 0),
  ];
  const charitableAssetsByYear: number[] = [
    charitableVehicles.reduce((sum, vehicle) => sum + vehicle.currentValue, 0),
  ];
  const distributionsByYear: number[] = [0];
  const familyAssetsByYear: number[] = [
    portfolioByYear[0] - charitableAssetsByYear[0],
  ];

  // For each year in simulation
  for (let year = 1; year <= simulationYears; year++) {
    // Generate correlated returns for all assets
    const assetReturns = generateCorrelatedReturns(assets, correlationMatrix);

    // Update asset values
    let totalPortfolioValue = 0;
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const return_rate = assetReturns[i];

      // Apply impact investment premium/discount if applicable
      const adjustedReturn = asset.impactFocused
        ? return_rate - 0.01 // 1% lower returns for impact investments
        : return_rate;

      // Update asset value
      asset.currentValue = asset.currentValue * (1 + adjustedReturn);
      totalPortfolioValue += asset.currentValue;
    }

    // Update charitable vehicles
    let totalCharitableAssets = 0;
    let totalDistributions = 0;

    for (const vehicle of charitableVehicles) {
      // Apply investment returns based on strategy
      const strategy = vehicle.investmentStrategy;

      let vehicleReturn = 0;
      let totalWeight = 0;

      // Calculate weighted return based on asset allocation in strategy
      for (const assetClass in strategy.allocation) {
        const weight = strategy.allocation[assetClass as AssetClass];
        const return_rate = strategy.returns[assetClass as AssetClass];
        const volatility = strategy.volatility[assetClass as AssetClass];

        // Generate random return for this asset class
        const assetReturn = randomNormal(return_rate, volatility);
        vehicleReturn += weight * assetReturn;
        totalWeight += weight;
      }

      // Normalize if weights don't sum to 1
      if (totalWeight > 0) {
        vehicleReturn = vehicleReturn / totalWeight;
      }

      // Apply investment return
      vehicle.currentValue = vehicle.currentValue * (1 + vehicleReturn);

      // Add annual contribution
      vehicle.currentValue += vehicle.annualContribution;

      // Subtract admin costs
      const adminCosts = vehicle.currentValue * vehicle.annualAdminCosts;
      vehicle.currentValue -= adminCosts;

      // Calculate required distribution
      const requiredDistribution =
        vehicle.currentValue * vehicle.distributionRequirement;

      // Make distribution
      vehicle.currentValue -= requiredDistribution;
      totalDistributions += requiredDistribution;

      totalCharitableAssets += vehicle.currentValue;
    }

    // Update yearly tracking
    portfolioByYear.push(totalPortfolioValue);
    charitableAssetsByYear.push(totalCharitableAssets);
    distributionsByYear.push(totalDistributions);
    familyAssetsByYear.push(totalPortfolioValue - totalCharitableAssets);
  }

  return {
    portfolioByYear,
    charitableAssetsByYear,
    distributionsByYear,
    familyAssetsByYear,
  };
}

// Model family member longevity and succession
function modelFamilySuccession(
  familyMembers: any[],
  simulationYears: number
): {
  aliveByYear: any[][];
  successorsByYear: any[][];
  totalInvolvementByYear: number[];
} {
  // Deep copy family members to avoid modifying original
  const members = JSON.parse(JSON.stringify(familyMembers));

  // Initialize results
  const aliveByYear: any[][] = [members];
  const successorsByYear: any[][] = [members.filter((m) => m.successorFlag)];
  const totalInvolvementByYear: number[] = [
    members.reduce((sum, member) => sum + member.timeCommitment, 0),
  ];

  // For each year
  for (let year = 1; year <= simulationYears; year++) {
    const previousYearMembers = aliveByYear[year - 1];
    const aliveThisYear: any[] = [];

    // Check which members are still alive
    for (const member of previousYearMembers) {
      member.age += 1;

      // Simple longevity model - if age exceeds life expectancy, member passes away
      if (member.age <= member.lifeExpectancy) {
        aliveThisYear.push(member);
      }
    }

    // Identify successors
    const successorsThisYear = aliveThisYear.filter((m) => m.successorFlag);

    // Calculate total involvement
    const totalInvolvement = aliveThisYear.reduce(
      (sum, member) => sum + member.timeCommitment,
      0
    );

    // Save results for this year
    aliveByYear.push(aliveThisYear);
    successorsByYear.push(successorsThisYear);
    totalInvolvementByYear.push(totalInvolvement);
  }

  return {
    aliveByYear,
    successorsByYear,
    totalInvolvementByYear,
  };
}

// Calculate impact metrics for the philanthropic giving
function calculateImpactMetrics(
  distributionsByYear: number[],
  causeAreas: string[],
  missionAlignment: number
): number {
  // This is a simplified impact model
  // In reality, impact would be a complex function of many variables

  // Total distributions
  const totalDistributions = distributionsByYear.reduce(
    (sum, dist) => sum + dist,
    0
  );

  // Impact multiplier based on focus areas (simplified)
  const focusMultiplier = Math.min(1.2, 0.8 + causeAreas.length * 0.1);

  // Mission alignment multiplier
  const alignmentMultiplier = 0.5 + missionAlignment * 0.5;

  // Calculate impact score (simplified)
  const impactScore =
    totalDistributions * focusMultiplier * alignmentMultiplier;

  return impactScore;
}

// Calculate balance between family needs and philanthropic goals
function calculateFamilyPhilanthropyBalance(
  familyAssetsByYear: number[],
  charitableAssetsByYear: number[],
  familyMembers: any[],
  philanthropicAllocation: number
): number {
  // Calculate final ratio of family to charitable assets
  const finalFamilyAssets = familyAssetsByYear[familyAssetsByYear.length - 1];
  const finalCharitableAssets =
    charitableAssetsByYear[charitableAssetsByYear.length - 1];
  const finalRatio =
    finalFamilyAssets / (finalFamilyAssets + finalCharitableAssets);

  // Calculate target ratio based on philanthropic allocation
  const targetRatio = 1 - philanthropicAllocation;

  // Calculate ratio alignment (how close actual ratio is to target)
  const ratioAlignment = 1 - Math.abs(finalRatio - targetRatio);

  // Calculate family needs coverage
  const totalFamilyExpenses = familyMembers.reduce(
    (sum, member) => sum + member.annualExpenses,
    0
  );
  const finalYearCoverage = finalFamilyAssets / (totalFamilyExpenses * 25); // 25 years of expenses
  const needsCoverage = Math.min(1, finalYearCoverage);

  // Calculate philanthropic engagement
  const totalPhilanthropicInterest = familyMembers.reduce(
    (sum, member) => sum + member.philanthropicInterest,
    0
  );
  const averagePhilanthropicInterest =
    totalPhilanthropicInterest / familyMembers.length;

  // Combine metrics into a balance score
  const balanceScore =
    ratioAlignment * 0.4 +
    needsCoverage * 0.4 +
    averagePhilanthropicInterest * 0.2;

  return balanceScore;
}

// Main Monte Carlo simulation function
export function runPhilanthropyLegacyMonteCarlo(
  config: PhilanthropicSimulationConfig
): SimulationResult {
  const {
    simulationYears,
    simulationRuns,
    assets,
    charitableVehicles,
    familyMembers,
    legacyPlan,
    withdrawalStrategy,
    baseWithdrawalRate,
    inflationRate,
    familyGrowthRate,
    taxRate,
    philanthropicAllocation,
    familyAllocation,
    investmentStrategies,
    impactPremium,
    correlationMatrix,
  } = config;

  let totalPhilanthropicImpact = 0;
  let totalFamilyWealth = 0;
  let totalPhilanthropicCapital = 0;
  let failedSimulations = 0;
  let successorReadinessSum = 0;
  let familyEngagementSum = 0;
  let balanceScoreSum = 0;
  let perpetuityCases = 0;

  // Test different withdrawal rates
  const withdrawalRates: number[] = [];
  for (let rate = 0.02; rate <= 0.07; rate += 0.005) {
    withdrawalRates.push(rate);
  }

  let optimalWithdrawalRateSum = 0;

  // Evaluate different charitable vehicles
  const vehicleMixes: Record<string, number>[] = [];

  // Run multiple simulations
  for (let run = 0; run < simulationRuns; run++) {
    // Deep copy assets and vehicles for this simulation
    const simulationAssets = JSON.parse(JSON.stringify(assets)) as Asset[];
    const simulationVehicles = JSON.parse(
      JSON.stringify(charitableVehicles)
    ) as any[];

    // Simulate portfolio performance
    const {
      portfolioByYear,
      charitableAssetsByYear,
      distributionsByYear,
      familyAssetsByYear,
    } = simulatePortfolioPerformance(
      simulationAssets,
      simulationVehicles,
      correlationMatrix,
      simulationYears,
      inflationRate
    );

    // Determine if this simulation meets family needs
    const finalFamilyAssets = familyAssetsByYear[familyAssetsByYear.length - 1];
    const totalFamilyExpenses =
      familyMembers.reduce((sum, member) => sum + member.annualExpenses, 0) *
      Math.pow(1 + familyGrowthRate, simulationYears); // Grow expenses by family growth rate

    const familyNeedsMet = finalFamilyAssets >= totalFamilyExpenses * 10; // 10 years of expenses as buffer

    if (!familyNeedsMet) {
      failedSimulations++;
    }

    // Calculate philanthropic impact
    const causeAreas = charitableVehicles.flatMap(
      (vehicle) => vehicle.causeAreas
    );
    const uniqueCauseAreas = [...new Set(causeAreas)];

    // Calculate mission alignment between family interests and charitable vehicles
    const familyCauseAreas = familyMembers.flatMap(
      (member) => member.causeAreas
    );
    const uniqueFamilyCauseAreas = [...new Set(familyCauseAreas)];

    const commonCauses = uniqueCauseAreas.filter((cause) =>
      uniqueFamilyCauseAreas.includes(cause)
    );
    const missionAlignment =
      commonCauses.length / Math.max(uniqueCauseAreas.length, 1);

    const philanthropicImpact = calculateImpactMetrics(
      distributionsByYear,
      uniqueCauseAreas,
      missionAlignment
    );

    // Model family succession
    const { aliveByYear, successorsByYear, totalInvolvementByYear } =
      modelFamilySuccession(familyMembers, simulationYears);

    // Calculate successor readiness
    const finalSuccessors = successorsByYear[successorsByYear.length - 1];
    const successorReadiness =
      finalSuccessors.length > 0
        ? finalSuccessors.reduce((sum, s) => sum + s.philanthropicInterest, 0) /
          finalSuccessors.length
        : 0;

    // Calculate family engagement
    const finalInvolvement =
      totalInvolvementByYear[totalInvolvementByYear.length - 1];
    const familyEngagement = Math.min(
      1,
      finalInvolvement / legacyPlan.minimumFamilyInvolvement
    );

    // Calculate balance score
    const balanceScore = calculateFamilyPhilanthropyBalance(
      familyAssetsByYear,
      charitableAssetsByYear,
      familyMembers,
      philanthropicAllocation
    );

    // Check for perpetuity
    const finalCharitableAssets =
      charitableAssetsByYear[charitableAssetsByYear.length - 1];
    const initialCharitableAssets = charitableAssetsByYear[0];
    const perpetuityAchieved = finalCharitableAssets >= initialCharitableAssets;

    if (perpetuityAchieved) {
      perpetuityCases++;
    }

    // Find optimal withdrawal rate for this simulation
    let bestRate = 0;
    let bestOutcome = 0;

    for (const rate of withdrawalRates) {
      // Simple scoring based on sustainability and impact
      const sustainabilityScore =
        finalCharitableAssets / initialCharitableAssets;
      const impactScore = rate * simulationYears;

      // Balance sustainability and impact
      const outcomeScore = sustainabilityScore * 0.6 + impactScore * 0.4;

      if (outcomeScore > bestOutcome) {
        bestOutcome = outcomeScore;
        bestRate = rate;
      }
    }

    // Aggregate results
    totalPhilanthropicImpact += philanthropicImpact;
    totalFamilyWealth += finalFamilyAssets;
    totalPhilanthropicCapital += distributionsByYear.reduce(
      (sum, d) => sum + d,
      0
    );
    successorReadinessSum += successorReadiness;
    familyEngagementSum += familyEngagement;
    balanceScoreSum += balanceScore;
    optimalWithdrawalRateSum += bestRate;
  }

  // Calculate final results
  return {
    philanthropicImpact: totalPhilanthropicImpact / simulationRuns,
    familyWealth: totalFamilyWealth / simulationRuns,
    sustainabilityScore: 1 - failedSimulations / simulationRuns,
    philanthropicCapitalDeployed: totalPhilanthropicCapital / simulationRuns,
    optimalVehicleMix: {}, // Simplified for now
    successorReadiness: successorReadinessSum / simulationRuns,
    familyEngagementScore: familyEngagementSum / simulationRuns,
    failureRate: failedSimulations / simulationRuns,
    optimalWithdrawalRate: optimalWithdrawalRateSum / simulationRuns,
    perpetuityProbability: perpetuityCases / simulationRuns,
    balanceScore: balanceScoreSum / simulationRuns,
  };
}
