import { Asset } from "./src/types";

// Family Office Tax Optimization Monte Carlo Simulation

// Define types for our simulation
type Jurisdiction = "US" | "UK" | "Switzerland" | "Singapore" | "Cayman";
type EntityType =
  | "individual"
  | "revocableTrust"
  | "irrevocableTrust"
  | "familyLimitedPartnership"
  | "llc"
  | "foundation";

// Extend the base Asset type for tax calculations
interface TaxAsset extends Asset {
  costBasis: number;
  jurisdiction: Jurisdiction;
  entityType: EntityType;
  incomePct: number;
  holdingPeriod: number; // Days held
  isTaxDeferred: boolean;
  taxLots: Array<{
    purchaseDate: Date;
    purchasePrice: number;
    quantity: number;
  }>;
}

interface TaxRates {
  ordinaryIncome: Record<Jurisdiction, number>;
  longTermCapitalGains: Record<Jurisdiction, number>;
  shortTermCapitalGains: Record<Jurisdiction, number>;
  dividends: Record<Jurisdiction, number>;
  estateTax: Record<Jurisdiction, number>;
  entitySpecificRates: Record<
    EntityType,
    {
      incomeTaxModifier: number; // Multiplier against base rate
      capitalGainsModifier: number;
      dividendsModifier: number;
      estateTaxModifier: number;
    }
  >;
}

interface HarvestingStrategy {
  threshold: number; // Loss threshold to trigger harvesting as percentage of position value
  maxAnnualLoss: number; // Maximum annual loss to harvest
  reinvestmentDelay: number; // Days to wait before reinvesting (wash sale rule)
}

interface TaxOptimizationConfig {
  simulationYears: number;
  simulationRuns: number;
  assets: TaxAsset[];
  taxRates: TaxRates;
  harvestingStrategies: HarvestingStrategy[];
  annualWithdrawal: number; // Family office spending needs
  inflationRate: number;
  entityTransferCosts: Record<EntityType, number>; // Costs to establish/transfer to entity
}

interface SimulationResult {
  totalAfterTaxValue: number;
  totalTaxesPaid: number;
  totalHarvestedLosses: number;
  optimalEntityMix: Record<EntityType, number>;
  optimalJurisdictionMix: Record<Jurisdiction, number>;
  successRate: number; // Percentage of simulations meeting withdrawal needs
  medianAnnualTaxRate: number;
}

// Initialize tax rates - These would vary by country and structure
const defaultTaxRates: TaxRates = {
  ordinaryIncome: {
    US: 0.37,
    UK: 0.45,
    Switzerland: 0.22,
    Singapore: 0.22,
    Cayman: 0.0,
  },
  longTermCapitalGains: {
    US: 0.2,
    UK: 0.2,
    Switzerland: 0.2,
    Singapore: 0.0,
    Cayman: 0.0,
  },
  shortTermCapitalGains: {
    US: 0.37,
    UK: 0.45,
    Switzerland: 0.22,
    Singapore: 0.22,
    Cayman: 0.0,
  },
  dividends: {
    US: 0.2,
    UK: 0.39,
    Switzerland: 0.35,
    Singapore: 0.0,
    Cayman: 0.0,
  },
  estateTax: {
    US: 0.4,
    UK: 0.4,
    Switzerland: 0.25,
    Singapore: 0.0,
    Cayman: 0.0,
  },
  entitySpecificRates: {
    individual: {
      incomeTaxModifier: 1.0,
      capitalGainsModifier: 1.0,
      dividendsModifier: 1.0,
      estateTaxModifier: 1.0,
    },
    revocableTrust: {
      incomeTaxModifier: 1.0,
      capitalGainsModifier: 1.0,
      dividendsModifier: 1.0,
      estateTaxModifier: 0.9,
    },
    irrevocableTrust: {
      incomeTaxModifier: 1.1, // Higher compressed brackets
      capitalGainsModifier: 1.0,
      dividendsModifier: 1.0,
      estateTaxModifier: 0.0, // Outside of estate
    },
    familyLimitedPartnership: {
      incomeTaxModifier: 1.0,
      capitalGainsModifier: 0.85, // Valuation discounts
      dividendsModifier: 1.0,
      estateTaxModifier: 0.6, // Significant discount
    },
    llc: {
      incomeTaxModifier: 1.0,
      capitalGainsModifier: 0.9,
      dividendsModifier: 1.0,
      estateTaxModifier: 0.8,
    },
    foundation: {
      incomeTaxModifier: 0.0, // Tax exempt
      capitalGainsModifier: 0.0, // Tax exempt
      dividendsModifier: 0.0, // Tax exempt
      estateTaxModifier: 0.0, // Outside of estate
    },
  },
};

// Sample portfolio for a family office
const sampleAssets: TaxAsset[] = [
  {
    id: "US-Equity-Portfolio",
    assetClass: "equity",
    currentValue: 50000000,
    costBasis: 30000000,
    jurisdiction: "US",
    entityType: "individual",
    annualReturn: 0.07,
    annualVolatility: 0.15,
    correlationGroup: 1,
    esgAligned: false,
    impactFocused: false,
    holdingPeriod: 365,
    isTaxDeferred: false,
    incomePct: 0.02, // Dividend yield
    taxLots: [
      {
        purchaseDate: new Date("2020-01-01"),
        purchasePrice: 100,
        quantity: 500000,
      },
    ],
  },
  {
    id: "US-Treasuries",
    assetClass: "fixedIncome",
    currentValue: 30000000,
    costBasis: 30000000,
    jurisdiction: "US",
    entityType: "revocableTrust",
    annualReturn: 0.03,
    annualVolatility: 0.05,
    correlationGroup: 2,
    esgAligned: true,
    impactFocused: false,
    holdingPeriod: 3,
    isTaxDeferred: false,
    incomePct: 0.03, // Yield
    taxLots: [
      {
        purchaseDate: new Date("2023-01-01"),
        purchasePrice: 1000,
        quantity: 30000,
      },
    ],
  },
  {
    id: "Real-Estate-Portfolio",
    assetClass: "realEstate",
    currentValue: 25000000,
    costBasis: 15000000,
    jurisdiction: "US",
    entityType: "llc",
    annualReturn: 0.06,
    annualVolatility: 0.12,
    correlationGroup: 3,
    esgAligned: true,
    impactFocused: true,
    holdingPeriod: 10,
    isTaxDeferred: false,
    incomePct: 0.04, // Rental income
    taxLots: [
      {
        purchaseDate: new Date("2015-01-01"),
        purchasePrice: 15000000,
        quantity: 1,
      },
    ],
  },
  {
    id: "Private-Equity-Fund",
    assetClass: "privateEquity",
    currentValue: 20000000,
    costBasis: 18000000,
    jurisdiction: "Cayman",
    entityType: "familyLimitedPartnership",
    annualReturn: 0.12,
    annualVolatility: 0.25,
    correlationGroup: 4,
    esgAligned: false,
    impactFocused: false,
    holdingPeriod: 7,
    isTaxDeferred: false,
    incomePct: 0.01,
    taxLots: [
      {
        purchaseDate: new Date("2018-01-01"),
        purchasePrice: 18000000,
        quantity: 1,
      },
    ],
  },
  {
    id: "Hedge-Fund-Allocation",
    assetClass: "hedge",
    currentValue: 15000000,
    costBasis: 15000000,
    jurisdiction: "Singapore",
    entityType: "irrevocableTrust",
    annualReturn: 0.09,
    annualVolatility: 0.14,
    correlationGroup: 5,
    esgAligned: true,
    impactFocused: false,
    holdingPeriod: 4,
    isTaxDeferred: false,
    incomePct: 0.02,
    taxLots: [
      {
        purchaseDate: new Date("2021-01-01"),
        purchasePrice: 15000000,
        quantity: 1,
      },
    ],
  },
];

// Random normal distribution generator (Box-Muller transform)
function randomNormal(mean: number, stdDev: number): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * stdDev;
}

// Simulate asset performance with random returns
function simulateAssetPerformance(
  asset: TaxAsset,
  years: number
): Array<{
  value: number;
  income: number;
  loss: number;
}> {
  const results: Array<{
    value: number;
    income: number;
    loss: number;
  }> = [];
  let currentValue = asset.currentValue;

  for (let year = 0; year < years; year++) {
    // Generate annual return with randomness
    const annualReturn = randomNormal(
      asset.annualReturn,
      asset.annualVolatility
    );

    // Calculate components
    const income = currentValue * asset.incomePct;
    const loss = currentValue * (annualReturn < 0 ? -annualReturn : 0);

    // Update current value
    currentValue = currentValue + income - loss;

    results.push({
      value: currentValue,
      income,
      loss,
    });
  }

  return results;
}

// Calculate taxes for a specific asset based on jurisdiction and entity type
function calculateAssetTaxes(
  asset: TaxAsset,
  performance: Array<{
    value: number;
    income: number;
    loss: number;
  }>,
  taxRates: TaxRates,
  harvestingStrategy: HarvestingStrategy
): {
  totalTax: number;
  incomeTax: number;
  capitalGainsTax: number;
  harvestedLosses: number;
} {
  let incomeTax = 0;
  let capitalGainsTax = 0;
  let harvestedLosses = 0;
  let unrealizedGains = asset.currentValue - asset.costBasis;
  let adjustedCostBasis = asset.costBasis;

  const { jurisdiction, entityType } = asset;
  const entityModifiers = taxRates.entitySpecificRates[entityType];

  for (let year = 0; year < performance.length; year++) {
    const { income, loss, value } = performance[year];

    // Income taxes (dividends, interest, etc.)
    const incomeRate =
      taxRates.dividends[jurisdiction] * entityModifiers.dividendsModifier;
    const yearlyIncomeTax = income * incomeRate;
    incomeTax += yearlyIncomeTax;

    // Tax-loss harvesting
    if (
      loss > value * harvestingStrategy.threshold &&
      loss <= harvestingStrategy.maxAnnualLoss
    ) {
      harvestedLosses += loss;
      adjustedCostBasis -= loss; // Adjust cost basis after harvest
    }

    // Update unrealized gains
    unrealizedGains = value - adjustedCostBasis;
  }

  // Capital gains tax at end of simulation (if asset is sold)
  // Use long-term rate if holding period is sufficient
  const isLongTerm = asset.holdingPeriod > 1; // Simplified; actual rules vary by jurisdiction
  const capitalGainsRate = isLongTerm
    ? taxRates.longTermCapitalGains[jurisdiction] *
      entityModifiers.capitalGainsModifier
    : taxRates.shortTermCapitalGains[jurisdiction] *
      entityModifiers.capitalGainsModifier;

  // Only pay capital gains tax on positive gains
  if (unrealizedGains > 0) {
    capitalGainsTax = unrealizedGains * capitalGainsRate;
  }

  // Apply harvested losses to offset capital gains (up to the amount of gains)
  const offsettableAmount = Math.min(
    capitalGainsTax,
    harvestedLosses * capitalGainsRate
  );
  capitalGainsTax -= offsettableAmount;

  return {
    totalTax: incomeTax + capitalGainsTax,
    incomeTax,
    capitalGainsTax,
    harvestedLosses,
  };
}

// Evaluate different entity and jurisdiction combinations
function evaluateEntityJurisdictionCombinations(
  assets: TaxAsset[],
  taxRates: TaxRates,
  simulationYears: number,
  entityTransferCosts: Record<EntityType, number>
): {
  optimalEntityMix: Record<EntityType, number>;
  optimalJurisdictionMix: Record<Jurisdiction, number>;
  totalValue: number;
} {
  let bestValue = 0;
  let bestEntityMix: Record<EntityType, number> = {
    individual: 0,
    revocableTrust: 0,
    irrevocableTrust: 0,
    familyLimitedPartnership: 0,
    llc: 0,
    foundation: 0,
  };
  let bestJurisdictionMix: Record<Jurisdiction, number> = {
    US: 0,
    UK: 0,
    Switzerland: 0,
    Singapore: 0,
    Cayman: 0,
  };

  // Generate all possible combinations (simplified - in reality would use optimization algorithms)
  // For this example, we'll just test some common combinations
  const combinations = [
    {
      entityType: "individual" as EntityType,
      jurisdiction: "US" as Jurisdiction,
    },
    {
      entityType: "revocableTrust" as EntityType,
      jurisdiction: "US" as Jurisdiction,
    },
    {
      entityType: "irrevocableTrust" as EntityType,
      jurisdiction: "US" as Jurisdiction,
    },
    {
      entityType: "familyLimitedPartnership" as EntityType,
      jurisdiction: "US" as Jurisdiction,
    },
    { entityType: "llc" as EntityType, jurisdiction: "US" as Jurisdiction },
    {
      entityType: "foundation" as EntityType,
      jurisdiction: "US" as Jurisdiction,
    },
    {
      entityType: "individual" as EntityType,
      jurisdiction: "Singapore" as Jurisdiction,
    },
    {
      entityType: "irrevocableTrust" as EntityType,
      jurisdiction: "Singapore" as Jurisdiction,
    },
    {
      entityType: "individual" as EntityType,
      jurisdiction: "Cayman" as Jurisdiction,
    },
    { entityType: "llc" as EntityType, jurisdiction: "Cayman" as Jurisdiction },
  ];

  for (const combo of combinations) {
    const { entityType, jurisdiction } = combo;

    // Deep copy assets for this simulation
    const testAssets = assets.map((asset) => ({
      ...asset,
      entityType,
      jurisdiction,
    }));

    let totalAfterTaxValue = 0;

    for (const asset of testAssets) {
      // Simulate asset performance
      const performance = simulateAssetPerformance(asset, simulationYears);

      // Basic harvesting strategy
      const harvestingStrategy: HarvestingStrategy = {
        threshold: 0.1,
        maxAnnualLoss: 3000000,
        reinvestmentDelay: 30,
      };

      // Calculate taxes
      const { totalTax } = calculateAssetTaxes(
        asset,
        performance,
        taxRates,
        harvestingStrategy
      );

      // Apply entity transfer costs
      const transferCost = entityTransferCosts[entityType];

      // Final value for this asset
      const finalAssetValue =
        performance[performance.length - 1].value - totalTax - transferCost;
      totalAfterTaxValue += finalAssetValue;
    }

    // Check if this combination is better than current best
    if (totalAfterTaxValue > bestValue) {
      bestValue = totalAfterTaxValue;

      // Update optimal mixes
      bestEntityMix = {
        individual: 0,
        revocableTrust: 0,
        irrevocableTrust: 0,
        familyLimitedPartnership: 0,
        llc: 0,
        foundation: 0,
      };
      bestEntityMix[entityType] = 1;

      bestJurisdictionMix = {
        US: 0,
        UK: 0,
        Switzerland: 0,
        Singapore: 0,
        Cayman: 0,
      };
      bestJurisdictionMix[jurisdiction] = 1;
    }
  }

  return {
    optimalEntityMix: bestEntityMix,
    optimalJurisdictionMix: bestJurisdictionMix,
    totalValue: bestValue,
  };
}

// Main Monte Carlo simulation function
function runTaxOptimizationMonteCarlo(
  config: TaxOptimizationConfig
): SimulationResult {
  const {
    simulationYears,
    simulationRuns,
    assets,
    taxRates,
    harvestingStrategies,
    annualWithdrawal,
    inflationRate,
    entityTransferCosts,
  } = config;

  const totalAfterTaxValues: number[] = [];
  const totalTaxesPaid: number[] = [];
  const totalHarvestedLosses: number[] = [];
  const entityMixes: Record<EntityType, number>[] = [];
  const jurisdictionMixes: Record<Jurisdiction, number>[] = [];
  let successfulRuns = 0;

  // Run multiple simulations
  for (let run = 0; run < simulationRuns; run++) {
    const portfolioValue = assets.reduce(
      (sum, asset) => sum + asset.currentValue,
      0
    );
    let portfolioAfterTaxValue = portfolioValue;
    let totalTaxes = 0;
    let totalHarvested = 0;
    let adjustedAnnualWithdrawal = annualWithdrawal;

    // Find optimal entity/jurisdiction combination
    const { optimalEntityMix, optimalJurisdictionMix, totalValue } =
      evaluateEntityJurisdictionCombinations(
        assets,
        taxRates,
        simulationYears,
        entityTransferCosts
      );

    // Store results
    portfolioAfterTaxValue = totalValue;
    entityMixes.push(optimalEntityMix);
    jurisdictionMixes.push(optimalJurisdictionMix);

    // Update best harvesting strategy
    let bestHarvestingValue = 0;

    for (const strategy of harvestingStrategies) {
      let strategyValue = 0;
      let strategyTaxes = 0;
      let strategyHarvested = 0;

      for (const asset of assets) {
        const performance = simulateAssetPerformance(asset, simulationYears);
        const { totalTax, harvestedLosses } = calculateAssetTaxes(
          asset,
          performance,
          taxRates,
          strategy
        );

        strategyValue += performance[performance.length - 1].value - totalTax;
        strategyTaxes += totalTax;
        strategyHarvested += harvestedLosses;
      }

      if (strategyValue > bestHarvestingValue) {
        bestHarvestingValue = strategyValue;
        totalTaxes = strategyTaxes;
        totalHarvested = strategyHarvested;
        portfolioAfterTaxValue = strategyValue;
      }
    }

    // Calculate whether this run was successful (met withdrawal needs)
    let successfulRun = true;
    for (let year = 0; year < simulationYears; year++) {
      // Adjust withdrawal for inflation
      adjustedAnnualWithdrawal *= 1 + inflationRate;

      // Check if portfolio can sustain withdrawal
      if (portfolioAfterTaxValue < adjustedAnnualWithdrawal) {
        successfulRun = false;
        break;
      }

      // Deduct withdrawal
      portfolioAfterTaxValue -= adjustedAnnualWithdrawal;
    }

    if (successfulRun) {
      successfulRuns++;
    }

    totalAfterTaxValues.push(portfolioAfterTaxValue);
    totalTaxesPaid.push(totalTaxes);
    totalHarvestedLosses.push(totalHarvested);
  }

  // Calculate median annual tax rate
  const medianTaxRate =
    totalTaxesPaid.sort((a, b) => a - b)[Math.floor(simulationRuns / 2)] /
    (assets.reduce((sum, asset) => sum + asset.currentValue, 0) *
      simulationYears);

  // Calculate success rate
  const successRate = successfulRuns / simulationRuns;

  // Aggregate entity and jurisdiction mixes
  const aggregatedEntityMix: Record<EntityType, number> = {
    individual: 0,
    revocableTrust: 0,
    irrevocableTrust: 0,
    familyLimitedPartnership: 0,
    llc: 0,
    foundation: 0,
  };

  const aggregatedJurisdictionMix: Record<Jurisdiction, number> = {
    US: 0,
    UK: 0,
    Switzerland: 0,
    Singapore: 0,
    Cayman: 0,
  };

  for (const mix of entityMixes) {
    for (const key in mix) {
      aggregatedEntityMix[key as EntityType] +=
        mix[key as EntityType] / simulationRuns;
    }
  }

  for (const mix of jurisdictionMixes) {
    for (const key in mix) {
      aggregatedJurisdictionMix[key as Jurisdiction] +=
        mix[key as Jurisdiction] / simulationRuns;
    }
  }

  return {
    totalAfterTaxValue:
      totalAfterTaxValues.reduce((a, b) => a + b, 0) / simulationRuns,
    totalTaxesPaid: totalTaxesPaid.reduce((a, b) => a + b, 0) / simulationRuns,
    totalHarvestedLosses:
      totalHarvestedLosses.reduce((a, b) => a + b, 0) / simulationRuns,
    optimalEntityMix: aggregatedEntityMix,
    optimalJurisdictionMix: aggregatedJurisdictionMix,
    successRate,
    medianAnnualTaxRate: medianTaxRate,
  };
}

// Example usage
const simulationConfig: TaxOptimizationConfig = {
  simulationYears: 20,
  simulationRuns: 1000,
  assets: sampleAssets,
  taxRates: defaultTaxRates,
  harvestingStrategies: [
    { threshold: 0.05, maxAnnualLoss: 1000000, reinvestmentDelay: 31 },
    { threshold: 0.1, maxAnnualLoss: 3000000, reinvestmentDelay: 31 },
    { threshold: 0.15, maxAnnualLoss: 5000000, reinvestmentDelay: 31 },
  ],
  annualWithdrawal: 5000000, // $5M annual withdrawal for family needs
  inflationRate: 0.02,
  entityTransferCosts: {
    individual: 0,
    revocableTrust: 50000,
    irrevocableTrust: 100000,
    familyLimitedPartnership: 75000,
    llc: 40000,
    foundation: 250000,
  },
};

// Run simulation
const result = runTaxOptimizationMonteCarlo(simulationConfig);
console.log("Simulation Results:", result);

// The simulation could be extended further to include:
// 1. More sophisticated asset correlations
// 2. Multiple generations and inheritance planning
// 3. More complex cross-border tax rules and treaties
// 4. Trust distribution mechanics
// 5. Charitable planning aspects
// 6. Generation-skipping taxes
// 7. Opportunity zone investments
// 8. Dynamic rebalancing based on tax considerations
