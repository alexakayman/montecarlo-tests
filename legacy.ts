import { Asset, AssetClass } from "./src/types";

// Family Office Philanthropy and Legacy Planning Monte Carlo Simulation

// Define types for our simulation
type CharitableEntity =
  | "privateFoundation"
  | "donorAdvisedFund"
  | "charitableTrust"
  | "directGiving"
  | "llc";
type WithdrawalStrategy =
  | "fixedPercentage"
  | "inflationAdjusted"
  | "endowmentModel"
  | "variablePercentage";

interface Asset {
  id: string;
  assetClass: AssetClass;
  currentValue: number;
  annualReturn: number;
  annualVolatility: number;
  correlationGroup: number; // For asset correlation modeling
  esgAligned: boolean; // If the asset aligns with ESG principles
  impactFocused: boolean; // If the asset is focused on impact investing
}

interface CharitableVehicle {
  id: string;
  type: CharitableEntity;
  currentValue: number;
  annualContribution: number;
  annualAdminCosts: number; // As a percentage of assets
  distributionRequirement: number; // Minimum distribution requirement as percentage
  investmentStrategy: "conservative" | "balanced" | "growth";
  causeAreas: string[]; // Focus areas for philanthropy
  missionStatement: string;
  familyInvolvement: number; // Hours per year of family time commitment
  assets: Asset[]; // Assets held within the vehicle
}

interface FamilyMember {
  id: string;
  age: number;
  lifeExpectancy: number;
  annualIncome: number;
  annualExpenses: number;
  philanthropicInterest: number; // 0-1 scale of interest in philanthropy
  causeAreas: string[]; // Areas of philanthropic interest
  timeCommitment: number; // Hours per year willing to commit to philanthropy
  successorFlag: boolean; // Whether this member is a potential successor for foundation leadership
}

interface LegacyPlan {
  missionStatement: string;
  sunsetting: boolean; // Whether the philanthropic entities will sunset or exist in perpetuity
  sunsetYear?: number; // If sunsetting, in which year
  successorPolicy: "familyOnly" | "familyAndProfessional" | "professionalOnly";
  minimumFamilyInvolvement: number; // Hours per year required from family
  governanceStructure:
    | "singleDecisionMaker"
    | "familyBoard"
    | "mixedBoard"
    | "independentBoard";
  impactMeasurementFramework: string; // How impact is measured
  primaryCharitableEntity: CharitableEntity;
  philanthropicPercentage: number; // Percentage of total wealth dedicated to philanthropy
}

interface PhilanthropicSimulationConfig {
  simulationYears: number;
  simulationRuns: number;
  assets: Asset[];
  charitableVehicles: CharitableVehicle[];
  familyMembers: FamilyMember[];
  legacyPlan: LegacyPlan;
  withdrawalStrategy: WithdrawalStrategy;
  baseWithdrawalRate: number; // Base annual withdrawal rate
  inflationRate: number;
  familyGrowthRate: number; // Rate at which family grows and expenses increase
  taxRate: number; // Effective tax rate for non-charitable assets
  philanthropicAllocation: number; // Percentage of portfolio allocated to philanthropy
  familyAllocation: number; // Percentage of portfolio reserved for family needs
  investmentStrategies: Record<
    string,
    {
      returns: Record<AssetClass, number>;
      volatility: Record<AssetClass, number>;
    }
  >;
  impactPremium: number; // The "discount" accepted for impact investments vs. traditional (e.g., -0.01 for 1% lower returns)
  correlationMatrix: number[][]; // Correlation between asset classes
}

interface SimulationResult {
  philanthropicImpact: number; // Estimated total philanthropic impact
  familyWealth: number; // Remaining family wealth at end of simulation
  sustainabilityScore: number; // 0-1 score of how sustainable the giving strategy is
  philanthropicCapitalDeployed: number; // Total deployed to philanthropy
  optimalVehicleMix: Record<CharitableEntity, number>; // Optimal mix of charitable vehicles
  successorReadiness: number; // 0-1 score of how prepared successors are
  familyEngagementScore: number; // 0-1 score of family engagement
  failureRate: number; // Percentage of simulations where family runs out of money
  optimalWithdrawalRate: number; // Optimal sustainable withdrawal rate
  perpetuityProbability: number; // Probability of maintaining giving in perpetuity
  balanceScore: number; // How well balanced family vs. philanthropic needs
}

// Correlation matrix between different asset classes
// Order: equity, fixedIncome, realEstate, privateEquity, hedge, cash
const defaultCorrelationMatrix: number[][] = [
  [1.0, 0.2, 0.5, 0.7, 0.6, 0.0], // equity
  [0.2, 1.0, 0.3, 0.1, 0.2, 0.1], // fixedIncome
  [0.5, 0.3, 1.0, 0.4, 0.3, 0.0], // realEstate
  [0.7, 0.1, 0.4, 1.0, 0.5, 0.0], // privateEquity
  [0.6, 0.2, 0.3, 0.5, 1.0, 0.0], // hedge
  [0.0, 0.1, 0.0, 0.0, 0.0, 1.0], // cash
];

// Default investment strategies
const defaultInvestmentStrategies = {
  conservative: {
    returns: {
      equity: 0.06,
      fixedIncome: 0.03,
      realEstate: 0.04,
      privateEquity: 0.08,
      hedge: 0.05,
      cash: 0.01,
    },
    volatility: {
      equity: 0.15,
      fixedIncome: 0.05,
      realEstate: 0.12,
      privateEquity: 0.25,
      hedge: 0.12,
      cash: 0.01,
    },
    allocation: {
      equity: 0.3,
      fixedIncome: 0.4,
      realEstate: 0.1,
      privateEquity: 0.05,
      hedge: 0.05,
      cash: 0.1,
    },
  },
  balanced: {
    returns: {
      equity: 0.07,
      fixedIncome: 0.03,
      realEstate: 0.05,
      privateEquity: 0.1,
      hedge: 0.06,
      cash: 0.01,
    },
    volatility: {
      equity: 0.18,
      fixedIncome: 0.05,
      realEstate: 0.14,
      privateEquity: 0.25,
      hedge: 0.14,
      cash: 0.01,
    },
    allocation: {
      equity: 0.5,
      fixedIncome: 0.25,
      realEstate: 0.1,
      privateEquity: 0.05,
      hedge: 0.07,
      cash: 0.03,
    },
  },
  growth: {
    returns: {
      equity: 0.08,
      fixedIncome: 0.03,
      realEstate: 0.06,
      privateEquity: 0.12,
      hedge: 0.07,
      cash: 0.01,
    },
    volatility: {
      equity: 0.2,
      fixedIncome: 0.05,
      realEstate: 0.16,
      privateEquity: 0.3,
      hedge: 0.16,
      cash: 0.01,
    },
    allocation: {
      equity: 0.65,
      fixedIncome: 0.1,
      realEstate: 0.1,
      privateEquity: 0.08,
      hedge: 0.05,
      cash: 0.02,
    },
  },
};

// SAMPLE INPUTS
const sampleAssets: Asset[] = [
  {
    id: "US-Equity-Portfolio",
    assetClass: "equity",
    currentValue: 50000000,
    annualReturn: 0.08,
    annualVolatility: 0.18,
    correlationGroup: 1,
    esgAligned: false,
    impactFocused: false,
  },
  {
    id: "ESG-Equity-Fund",
    assetClass: "equity",
    currentValue: 30000000,
    annualReturn: 0.075,
    annualVolatility: 0.17,
    correlationGroup: 1,
    esgAligned: true,
    impactFocused: false,
  },
  {
    id: "Bond-Portfolio",
    assetClass: "fixedIncome",
    currentValue: 40000000,
    annualReturn: 0.03,
    annualVolatility: 0.05,
    correlationGroup: 2,
    esgAligned: false,
    impactFocused: false,
  },
  {
    id: "Impact-Investment-Fund",
    assetClass: "privateEquity",
    currentValue: 15000000,
    annualReturn: 0.09,
    annualVolatility: 0.22,
    correlationGroup: 3,
    esgAligned: true,
    impactFocused: true,
  },
  {
    id: "Real-Estate-Holdings",
    assetClass: "realEstate",
    currentValue: 25000000,
    annualReturn: 0.06,
    annualVolatility: 0.15,
    correlationGroup: 4,
    esgAligned: false,
    impactFocused: false,
  },
  {
    id: "Hedge-Fund-Allocation",
    assetClass: "hedge",
    currentValue: 20000000,
    annualReturn: 0.07,
    annualVolatility: 0.14,
    correlationGroup: 5,
    esgAligned: false,
    impactFocused: false,
  },
  {
    id: "Cash-Reserves",
    assetClass: "cash",
    currentValue: 10000000,
    annualReturn: 0.01,
    annualVolatility: 0.01,
    correlationGroup: 6,
    esgAligned: false,
    impactFocused: false,
  },
];

const sampleCharitableVehicles: CharitableVehicle[] = [
  {
    id: "Family-Foundation",
    type: "privateFoundation",
    currentValue: 20000000,
    annualContribution: 2000000,
    annualAdminCosts: 0.01, // 1% admin costs
    distributionRequirement: 0.05, // 5% minimum distribution
    investmentStrategy: "balanced",
    causeAreas: ["Education", "Healthcare", "Environment"],
    missionStatement:
      "To create lasting positive change in our communities through strategic philanthropy.",
    familyInvolvement: 500, // 500 hours per year from family
    assets: [], // Will be populated with foundation assets
  },
  {
    id: "Donor-Advised-Fund",
    type: "donorAdvisedFund",
    currentValue: 5000000,
    annualContribution: 1000000,
    annualAdminCosts: 0.007, // 0.7% admin costs
    distributionRequirement: 0, // No legal minimum
    investmentStrategy: "growth",
    causeAreas: ["Poverty Alleviation", "Arts"],
    missionStatement:
      "To support community organizations addressing urgent social needs.",
    familyInvolvement: 100, // 100 hours per year from family
    assets: [], // Will be populated with DAF assets
  },
  {
    id: "Charitable-Trust",
    type: "charitableTrust",
    currentValue: 10000000,
    annualContribution: 0, // No additional contributions planned
    annualAdminCosts: 0.008, // 0.8% admin costs
    distributionRequirement: 0.04, // 4% minimum distribution
    investmentStrategy: "conservative",
    causeAreas: ["Medical Research"],
    missionStatement: "To advance medical research for rare diseases.",
    familyInvolvement: 50, // 50 hours per year
    assets: [], // Will be populated with trust assets
  },
];

const sampleFamilyMembers: FamilyMember[] = [
  {
    id: "Founder",
    age: 70,
    lifeExpectancy: 90,
    annualIncome: 2000000,
    annualExpenses: 1000000,
    philanthropicInterest: 0.9, // Very interested
    causeAreas: ["Education", "Healthcare", "Environment"],
    timeCommitment: 300, // 300 hours per year
    successorFlag: false,
  },
  {
    id: "Spouse",
    age: 68,
    lifeExpectancy: 92,
    annualIncome: 500000,
    annualExpenses: 1000000, // Shared expenses with founder
    philanthropicInterest: 0.8,
    causeAreas: ["Arts", "Education"],
    timeCommitment: 250, // 250 hours per year
    successorFlag: false,
  },
  {
    id: "Child-1",
    age: 45,
    lifeExpectancy: 85,
    annualIncome: 1500000,
    annualExpenses: 800000,
    philanthropicInterest: 0.7,
    causeAreas: ["Environment", "Social Justice"],
    timeCommitment: 150, // 150 hours per year
    successorFlag: true,
  },
  {
    id: "Child-2",
    age: 42,
    lifeExpectancy: 85,
    annualIncome: 1200000,
    annualExpenses: 700000,
    philanthropicInterest: 0.4,
    causeAreas: ["Poverty Alleviation"],
    timeCommitment: 50, // 50 hours per year
    successorFlag: false,
  },
  {
    id: "Grandchild-1",
    age: 18,
    lifeExpectancy: 85,
    annualIncome: 0,
    annualExpenses: 100000, // College expenses
    philanthropicInterest: 0.6,
    causeAreas: ["Climate Change", "Education"],
    timeCommitment: 30, // 30 hours per year
    successorFlag: true,
  },
];

const sampleLegacyPlan: LegacyPlan = {
  missionStatement:
    "To create lasting positive change through strategic philanthropy while ensuring financial security for future generations.",
  sunsetting: false, // Plan to exist in perpetuity
  successorPolicy: "familyAndProfessional",
  minimumFamilyInvolvement: 200, // 200 hours per year minimum
  governanceStructure: "mixedBoard",
  impactMeasurementFramework:
    "Balanced Scorecard with annual impact assessments",
  primaryCharitableEntity: "privateFoundation",
  philanthropicPercentage: 0.3, // 30% of wealth dedicated to philanthropy
};

// CALCULATIONS

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
  // This is a simplified approach - in a real implementation,
  // you'd use a proper Cholesky decomposition algorithm
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
  charitableVehicles: CharitableVehicle[],
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
      const strategy = defaultInvestmentStrategies[vehicle.investmentStrategy];

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

// Calculate sustainable withdrawal rates
function calculateSustainableWithdrawalRate(
  charitableVehicle: CharitableVehicle,
  simulationYears: number,
  successProbability: number = 0.95,
  inflationRate: number = 0.02,
  simulationRuns: number = 1000
): number {
  // Test withdrawal rates from 2% to 7% in 0.25% increments
  const testRates: number[] = [];
  for (let rate = 0.02; rate <= 0.07; rate += 0.0025) {
    testRates.push(rate);
  }

  let optimalRate = 0;

  // For each test rate
  for (const rate of testRates) {
    let successfulRuns = 0;

    // Run multiple simulations
    for (let run = 0; run < simulationRuns; run++) {
      let vehicleValue = charitableVehicle.currentValue;
      let initialDistribution = vehicleValue * rate;
      let distribution = initialDistribution;
      let successful = true;

      // Simulate for the specified number of years
      for (let year = 1; year <= simulationYears; year++) {
        // Apply strategy returns
        const strategy =
          defaultInvestmentStrategies[charitableVehicle.investmentStrategy];

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
        vehicleValue = vehicleValue * (1 + vehicleReturn);

        // Add annual contribution
        vehicleValue += charitableVehicle.annualContribution;

        // Subtract admin costs
        const adminCosts = vehicleValue * charitableVehicle.annualAdminCosts;
        vehicleValue -= adminCosts;

        // Increase distribution for inflation
        distribution = distribution * (1 + inflationRate);

        // Make distribution
        vehicleValue -= distribution;

        // Check if vehicle has sufficient funds
        if (vehicleValue <= 0) {
          successful = false;
          break;
        }
      }

      if (successful) {
        successfulRuns++;
      }
    }

    // Calculate success rate
    const successRate = successfulRuns / simulationRuns;

    // If success rate meets or exceeds target probability
    if (successRate >= successProbability) {
      optimalRate = rate;
    } else {
      // Break at first failure - we've found our max sustainable rate
      break;
    }
  }

  return optimalRate;
}

// Model family member longevity and succession
function modelFamilySuccession(
  familyMembers: FamilyMember[],
  simulationYears: number
): {
  aliveByYear: FamilyMember[][];
  successorsByYear: FamilyMember[][];
  totalInvolvementByYear: number[];
} {
  // Deep copy family members to avoid modifying original
  const members = JSON.parse(JSON.stringify(familyMembers)) as FamilyMember[];

  // Initialize results
  const aliveByYear: FamilyMember[][] = [members];
  const successorsByYear: FamilyMember[][] = [
    members.filter((m) => m.successorFlag),
  ];
  const totalInvolvementByYear: number[] = [
    members.reduce((sum, member) => sum + member.timeCommitment, 0),
  ];

  // For each year
  for (let year = 1; year <= simulationYears; year++) {
    const previousYearMembers = aliveByYear[year - 1];
    const aliveThisYear: FamilyMember[] = [];

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

// Compare different charitable vehicles
function evaluateCharitableVehicles(
  initialCapital: number,
  annualContribution: number,
  simulationYears: number,
  inflationRate: number
): Record<CharitableEntity, number> {
  const vehicleTypes: CharitableEntity[] = [
    "privateFoundation",
    "donorAdvisedFund",
    "charitableTrust",
    "directGiving",
    "llc",
  ];

  const results: Record<CharitableEntity, number> = {
    privateFoundation: 0,
    donorAdvisedFund: 0,
    charitableTrust: 0,
    directGiving: 0,
    llc: 0,
  };

  // Define characteristics for each vehicle type
  const vehicleCharacteristics: Record<
    CharitableEntity,
    {
      adminCosts: number;
      distributionRequirement: number;
      taxEfficiency: number; // 0-1 scale of tax advantages
      controlFactor: number; // 0-1 scale of donor control
      flexibilityFactor: number; // 0-1 scale of flexibility
    }
  > = {
    privateFoundation: {
      adminCosts: 0.01, // 1%
      distributionRequirement: 0.05, // 5%
      taxEfficiency: 0.8,
      controlFactor: 1.0,
      flexibilityFactor: 0.9,
    },
    donorAdvisedFund: {
      adminCosts: 0.007, // 0.7%
      distributionRequirement: 0.0, // No legal minimum
      taxEfficiency: 0.9,
      controlFactor: 0.7,
      flexibilityFactor: 0.8,
    },
    charitableTrust: {
      adminCosts: 0.008, // 0.8%
      distributionRequirement: 0.04, // 4%
      taxEfficiency: 0.85,
      controlFactor: 0.8,
      flexibilityFactor: 0.6,
    },
    directGiving: {
      adminCosts: 0.0, // 0%
      distributionRequirement: 1.0, // 100%
      taxEfficiency: 0.7,
      controlFactor: 0.5,
      flexibilityFactor: 0.5,
    },
    llc: {
      adminCosts: 0.005, // 0.5%
      distributionRequirement: 0.0, // No requirement
      taxEfficiency: 0.6,
      controlFactor: 1.0,
      flexibilityFactor: 1.0,
    },
  };

  // For each vehicle type
  for (const vehicleType of vehicleTypes) {
    const characteristics = vehicleCharacteristics[vehicleType];

    // Create test vehicle
    const testVehicle: CharitableVehicle = {
      id: `Test-${vehicleType}`,
      type: vehicleType,
      currentValue: initialCapital,
      annualContribution: annualContribution,
      annualAdminCosts: characteristics.adminCosts,
      distributionRequirement: characteristics.distributionRequirement,
      investmentStrategy: "balanced",
      causeAreas: ["Education", "Healthcare"],
      missionStatement: "Test mission statement",
      familyInvolvement: 100,
      assets: [],
    };

    // Calculate sustainable withdrawal rate
    const sustainableRate = calculateSustainableWithdrawalRate(
      testVehicle,
      simulationYears,
      0.95, // 95% success probability
      inflationRate,
      500 // 500 simulation runs
    );

    // Calculate total distributions
    let totalDistributions = 0;
    let value = initialCapital;
    let distribution = value * sustainableRate;

    for (let year = 1; year <= simulationYears; year++) {
      // Simple growth model using balanced strategy
      const expectedReturn =
        defaultInvestmentStrategies.balanced.returns.equity * 0.5 +
        defaultInvestmentStrategies.balanced.returns.fixedIncome * 0.25 +
        defaultInvestmentStrategies.balanced.returns.realEstate * 0.1 +
        defaultInvestmentStrategies.balanced.returns.privateEquity * 0.05 +
        defaultInvestmentStrategies.balanced.returns.hedge * 0.07 +
        defaultInvestmentStrategies.balanced.returns.cash * 0.03;

      // Apply growth
      value = value * (1 + expectedReturn);

      // Add annual contribution
      value += annualContribution;

      // Subtract admin costs
      value -= value * characteristics.adminCosts;

      // Adjust distribution for inflation
      distribution *= 1 + inflationRate;

      // Apply minimum required distribution if applicable
      const minDistribution = value * characteristics.distributionRequirement;
      const actualDistribution = Math.max(distribution, minDistribution);

      // Make distribution
      value -= actualDistribution;
      totalDistributions += actualDistribution;
    }

    // Calculate vehicle score based on:
    // 1. Total distributions (40%)
    // 2. Tax efficiency (25%)
    // 3. Control factor (20%)
    // 4. Flexibility factor (15%)
    const distributionScore =
      totalDistributions /
      (initialCapital + annualContribution * simulationYears);
    const vehicleScore =
      distributionScore * 0.4 +
      characteristics.taxEfficiency * 0.25 +
      characteristics.controlFactor * 0.2 +
      characteristics.flexibilityFactor * 0.15;

    results[vehicleType] = vehicleScore;
  }

  // Normalize scores so they sum to 1
  const totalScore = Object.values(results).reduce(
    (sum, score) => sum + score,
    0
  );

  if (totalScore > 0) {
    for (const vehicle in results) {
      results[vehicle as CharitableEntity] /= totalScore;
    }
  }

  return results;
}

// Calculate balance between family needs and philanthropic goals
function calculateFamilyPhilanthropyBalance(
  familyAssetsByYear: number[],
  charitableAssetsByYear: number[],
  familyMembers: FamilyMember[],
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
function runPhilanthropyLegacyMonteCarlo(
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
  const vehicleMixes: Record<CharitableEntity, number>[] = [];

  // Run multiple simulations
  for (let run = 0; run < simulationRuns; run++) {
    // Deep copy assets and vehicles for this simulation
    const simulationAssets = JSON.parse(JSON.stringify(assets)) as Asset[];
    const simulationVehicles = JSON.parse(
      JSON.stringify(charitableVehicles)
    ) as CharitableVehicle[];

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

    // Evaluate mix of charitable vehicles
    const vehicleMix = evaluateCharitableVehicles(
      assets.reduce((sum, asset) => sum + asset.currentValue, 0) * 0.3, // 30% of assets
      familyMembers.reduce((sum, member) => sum + member.annualIncome, 0) * 0.1, // 10% of income
      simulationYears,
      inflationRate
    );

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
    vehicleMixes.push(vehicleMix);
  }

  // Average the vehicle mixes
  const optimalVehicleMix: Record<CharitableEntity, number> = {
    privateFoundation: 0,
    donorAdvisedFund: 0,
    charitableTrust: 0,
    directGiving: 0,
    llc: 0,
  };

  for (const mix of vehicleMixes) {
    for (const vehicle in mix) {
      optimalVehicleMix[vehicle as CharitableEntity] +=
        mix[vehicle as CharitableEntity] / simulationRuns;
    }
  }

  // Calculate final results
  return {
    philanthropicImpact: totalPhilanthropicImpact / simulationRuns,
    familyWealth: totalFamilyWealth / simulationRuns,
    sustainabilityScore: 1 - failedSimulations / simulationRuns,
    philanthropicCapitalDeployed: totalPhilanthropicCapital / simulationRuns,
    optimalVehicleMix,
    successorReadiness: successorReadinessSum / simulationRuns,
    familyEngagementScore: familyEngagementSum / simulationRuns,
    failureRate: failedSimulations / simulationRuns,
    optimalWithdrawalRate: optimalWithdrawalRateSum / simulationRuns,
    perpetuityProbability: perpetuityCases / simulationRuns,
    balanceScore: balanceScoreSum / simulationRuns,
  };
}

// SAMPLE INPUTS 2
const simulationConfig: PhilanthropicSimulationConfig = {
  simulationYears: 30,
  simulationRuns: 500,
  assets: sampleAssets,
  charitableVehicles: sampleCharitableVehicles,
  familyMembers: sampleFamilyMembers,
  legacyPlan: sampleLegacyPlan,
  withdrawalStrategy: "endowmentModel",
  baseWithdrawalRate: 0.04,
  inflationRate: 0.02,
  familyGrowthRate: 0.01,
  taxRate: 0.35,
  philanthropicAllocation: 0.3,
  familyAllocation: 0.7,
  investmentStrategies: defaultInvestmentStrategies,
  impactPremium: -0.01,
  correlationMatrix: defaultCorrelationMatrix,
};

// Run the simulation
const result = runPhilanthropyLegacyMonteCarlo(simulationConfig);
console.log("Simulation Results:", result);

// Sample output analytics:
// 1. Philanthropic Impact: Quantified impact of giving strategy
// 2. Family Wealth: Long-term family wealth preservation
// 3. Sustainability Score: Likelihood of strategy being sustainable
// 4. Philanthropic Capital: Total deployed for charitable purposes
// 5. Optimal Vehicle Mix: Recommended mix of charitable vehicles
// 6. Successor Readiness: How prepared next generation is
// 7. Family Engagement: Level of family involvement
// 8. Failure Rate: Probability of running out of funds
// 9. Optimal Withdrawal Rate: Sustainable giving rate
// 10. Perpetuity Probability: Likelihood of perpetual giving
// 11. Balance Score: How well balanced family vs philanthropy

// The simulation could be extended with:
// 1. More sophisticated impact measurement models
// 2. Detailed tax planning across generations
// 3. Governance models and decision-making simulation
// 4. Geographic allocation of philanthropic capital
// 5. Mission drift risk modeling
// 6. Program-related investment strategies
// 7. Next generation engagement strategies
// 8. Donor intent preservation modeling
