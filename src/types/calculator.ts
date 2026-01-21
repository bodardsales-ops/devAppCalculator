export interface CopierSolution {
  rent: number;
  packageBW: number;
  packageColor: number;
  packageFixedCost: number;
  costPerExtraBW: number;
  costPerExtraColor: number;
}

export interface ActualUsage {
  bwCopies: number;
  colorCopies: number;
}

export interface CalculationResult {
  monthlyTotal: number;
  annualTotal: number;
  basePackageCost: number;
  extraBWCost: number;
  extraColorCost: number;
  rentCost: number;
}

export interface ComparisonResult {
  current: CalculationResult;
  proposed: CalculationResult;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
}
