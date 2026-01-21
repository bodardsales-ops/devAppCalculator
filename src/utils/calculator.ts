import { CopierSolution, ActualUsage, CalculationResult, ComparisonResult } from '../types/calculator';

export function calculateCosts(
  solution: CopierSolution,
  usage: ActualUsage
): CalculationResult {
  const extraBW = Math.max(0, usage.bwCopies - solution.packageBW);
  const extraColor = Math.max(0, usage.colorCopies - solution.packageColor);

  const extraBWCost = extraBW * solution.costPerExtraBW;
  const extraColorCost = extraColor * solution.costPerExtraColor;
  const basePackageCost = solution.packageFixedCost;
  const rentCost = solution.rent;

  const monthlyTotal = rentCost + basePackageCost + extraBWCost + extraColorCost;
  const annualTotal = monthlyTotal * 12;

  return {
    monthlyTotal,
    annualTotal,
    basePackageCost,
    extraBWCost,
    extraColorCost,
    rentCost,
  };
}

export function compareResults(
  currentSolution: CopierSolution,
  proposedSolution: CopierSolution,
  usage: ActualUsage
): ComparisonResult {
  const current = calculateCosts(currentSolution, usage);
  const proposed = calculateCosts(proposedSolution, usage);

  const monthlySavings = current.monthlyTotal - proposed.monthlyTotal;
  const annualSavings = current.annualTotal - proposed.annualTotal;
  const savingsPercentage = current.monthlyTotal > 0
    ? (monthlySavings / current.monthlyTotal) * 100
    : 0;

  return {
    current,
    proposed,
    monthlySavings,
    annualSavings,
    savingsPercentage,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value);
}
