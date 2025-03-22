// src/types/index.ts

export type AssetClass =
  | "equity"
  | "fixedIncome"
  | "privateEquity"
  | "realEstate"
  | "hedge"
  | "cash";

export type InvestmentStrategy = "conservative" | "balanced" | "growth";

export type CharitableVehicleType =
  | "privateFoundation"
  | "donorAdvisedFund"
  | "charitableTrust";

export type SuccessorPolicy =
  | "familyOnly"
  | "familyAndProfessional"
  | "professionalOnly";

export type GovernanceStructure =
  | "familyBoard"
  | "mixedBoard"
  | "professionalBoard";

export type WithdrawalStrategy =
  | "endowmentModel"
  | "percentOfAssets"
  | "inflationAdjusted";

export interface Asset {
  id: string;
  assetClass: AssetClass;
  currentValue: number;
  annualReturn: number;
  annualVolatility: number;
  correlationGroup: number;
  esgAligned: boolean;
  impactFocused: boolean;
}

export interface CharitableVehicle {
  id: string;
  type: CharitableVehicleType;
  currentValue: number;
  annualContribution: number;
  annualAdminCosts: number;
  distributionRequirement: number;
  investmentStrategy: InvestmentStrategy;
  causeAreas: string[];
  missionStatement: string;
  familyInvolvement: number;
  assets: Asset[];
}

export interface FamilyMember {
  id: string;
  age: number;
  lifeExpectancy: number;
  annualIncome: number;
  annualExpenses: number;
  philanthropicInterest: number;
  causeAreas: string[];
  timeCommitment: number;
  successorFlag: boolean;
}

export interface LegacyPlan {
  missionStatement: string;
  sunsetting: boolean;
  successorPolicy: SuccessorPolicy;
  minimumFamilyInvolvement: number;
  governanceStructure: GovernanceStructure;
  impactMeasurementFramework: string;
  primaryCharitableEntity: CharitableVehicleType;
  philanthropicPercentage: number;
}

export interface InvestmentStrategyConfig {
  name: InvestmentStrategy;
  assetAllocation: Record<AssetClass, number>;
  esgPercentage: number;
  impactPercentage: number;
}

export interface PhilanthropicSimulationConfig {
  simulationYears: number;
  simulationRuns: number;
  assets: Asset[];
  charitableVehicles: CharitableVehicle[];
  familyMembers: FamilyMember[];
  legacyPlan: LegacyPlan;
  withdrawalStrategy: WithdrawalStrategy;
  baseWithdrawalRate: number;
  inflationRate: number;
  familyGrowthRate: number;
  taxRate: number;
  philanthropicAllocation: number;
  familyAllocation: number;
  investmentStrategies: InvestmentStrategyConfig[];
  impactPremium: number;
  correlationMatrix: number[][];
}

export interface SimulationResult {
  philanthropicImpact: number;
  familyWealth: number;
  sustainabilityScore: number;
  philanthropicCapitalDeployed: number;
  optimalVehicleMix: Record<string, number>;
  successorReadiness: number;
  familyEngagementScore: number;
  failureRate: number;
  optimalWithdrawalRate: number;
  perpetuityProbability: number;
  balanceScore: number;
}

// Default investment strategies for initial form values
export const defaultInvestmentStrategies: InvestmentStrategyConfig[] = [
  {
    name: "conservative",
    assetAllocation: {
      equity: 0.3,
      fixedIncome: 0.5,
      privateEquity: 0.05,
      realEstate: 0.05,
      hedge: 0.05,
      cash: 0.05,
    },
    esgPercentage: 0.2,
    impactPercentage: 0.05,
  },
  {
    name: "balanced",
    assetAllocation: {
      equity: 0.45,
      fixedIncome: 0.3,
      privateEquity: 0.1,
      realEstate: 0.1,
      hedge: 0.05,
      cash: 0.0,
    },
    esgPercentage: 0.3,
    impactPercentage: 0.1,
  },
  {
    name: "growth",
    assetAllocation: {
      equity: 0.6,
      fixedIncome: 0.15,
      privateEquity: 0.15,
      realEstate: 0.05,
      hedge: 0.05,
      cash: 0.0,
    },
    esgPercentage: 0.4,
    impactPercentage: 0.15,
  },
];

// Default correlation matrix
export const defaultCorrelationMatrix: number[][] = [
  [1.0, 0.2, 0.25, 0.3, 0.6, 0.0],
  [0.2, 1.0, 0.1, 0.15, 0.3, 0.0],
  [0.25, 0.1, 1.0, 0.35, 0.4, 0.0],
  [0.3, 0.15, 0.35, 1.0, 0.25, 0.0],
  [0.6, 0.3, 0.4, 0.25, 1.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
];

// Sample data
export const sampleAssets: Asset[] = [
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

export const sampleCharitableVehicles: CharitableVehicle[] = [
  {
    id: "Family-Foundation",
    type: "privateFoundation",
    currentValue: 20000000,
    annualContribution: 2000000,
    annualAdminCosts: 0.01,
    distributionRequirement: 0.05,
    investmentStrategy: "balanced",
    causeAreas: ["Education", "Healthcare", "Environment"],
    missionStatement:
      "To create lasting positive change in our communities through strategic philanthropy.",
    familyInvolvement: 500,
    assets: [],
  },
  {
    id: "Donor-Advised-Fund",
    type: "donorAdvisedFund",
    currentValue: 5000000,
    annualContribution: 1000000,
    annualAdminCosts: 0.007,
    distributionRequirement: 0,
    investmentStrategy: "growth",
    causeAreas: ["Poverty Alleviation", "Arts"],
    missionStatement:
      "To support community organizations addressing urgent social needs.",
    familyInvolvement: 100,
    assets: [],
  },
  {
    id: "Charitable-Trust",
    type: "charitableTrust",
    currentValue: 10000000,
    annualContribution: 0,
    annualAdminCosts: 0.008,
    distributionRequirement: 0.04,
    investmentStrategy: "conservative",
    causeAreas: ["Medical Research"],
    missionStatement: "To advance medical research for rare diseases.",
    familyInvolvement: 50,
    assets: [],
  },
];

export const sampleFamilyMembers: FamilyMember[] = [
  {
    id: "Founder",
    age: 70,
    lifeExpectancy: 90,
    annualIncome: 2000000,
    annualExpenses: 1000000,
    philanthropicInterest: 0.9,
    causeAreas: ["Education", "Healthcare", "Environment"],
    timeCommitment: 300,
    successorFlag: false,
  },
  {
    id: "Spouse",
    age: 68,
    lifeExpectancy: 92,
    annualIncome: 500000,
    annualExpenses: 1000000,
    philanthropicInterest: 0.8,
    causeAreas: ["Arts", "Education"],
    timeCommitment: 250,
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
    timeCommitment: 150,
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
    timeCommitment: 50,
    successorFlag: false,
  },
  {
    id: "Grandchild-1",
    age: 18,
    lifeExpectancy: 85,
    annualIncome: 0,
    annualExpenses: 100000,
    philanthropicInterest: 0.6,
    causeAreas: ["Climate Change", "Education"],
    timeCommitment: 30,
    successorFlag: true,
  },
];

export const sampleLegacyPlan: LegacyPlan = {
  missionStatement:
    "To create lasting positive change through strategic philanthropy while ensuring financial security for future generations.",
  sunsetting: false,
  successorPolicy: "familyAndProfessional",
  minimumFamilyInvolvement: 200,
  governanceStructure: "mixedBoard",
  impactMeasurementFramework:
    "Balanced Scorecard with annual impact assessments",
  primaryCharitableEntity: "privateFoundation",
  philanthropicPercentage: 0.3,
};

export const sampleConfig: PhilanthropicSimulationConfig = {
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

// Enum-like objects for form values
export const AssetClassValues = {
  equity: "equity",
  fixedIncome: "fixedIncome",
  privateEquity: "privateEquity",
  realEstate: "realEstate",
  hedge: "hedge",
  cash: "cash",
} as const;

export const CharitableVehicleTypeValues = {
  privateFoundation: "privateFoundation",
  donorAdvisedFund: "donorAdvisedFund",
  charitableTrust: "charitableTrust",
} as const;

export const InvestmentStrategyValues = {
  conservative: "conservative",
  balanced: "balanced",
  growth: "growth",
} as const;

export const SuccessorPolicyValues = {
  familyOnly: "familyOnly",
  familyAndProfessional: "familyAndProfessional",
  professionalOnly: "professionalOnly",
} as const;

export const GovernanceStructureValues = {
  familyBoard: "familyBoard",
  mixedBoard: "mixedBoard",
  professionalBoard: "professionalBoard",
} as const;

export const WithdrawalStrategyValues = {
  endowmentModel: "endowmentModel",
  percentOfAssets: "percentOfAssets",
  inflationAdjusted: "inflationAdjusted",
} as const;
