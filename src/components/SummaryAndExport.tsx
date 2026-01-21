import { CopierComparison } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { exportToPDF } from '../utils/exportPDF';
import { FileText, TrendingDown } from 'lucide-react';

interface SummaryAndExportProps {
  comparisons: CopierComparison[];
}

export default function SummaryAndExport({ comparisons }: SummaryAndExportProps) {
  const totalCurrentMonthly = comparisons.reduce((sum, c) => sum + c.current.monthlyTotal, 0);
  const totalProposedMonthly = comparisons.reduce((sum, c) => sum + c.proposed.monthlyTotal, 0);
  const monthlySavings = totalCurrentMonthly - totalProposedMonthly;
  const annualSavings = monthlySavings * 12;

  const handleExportPDF = () => {
    exportToPDF(comparisons, { monthly: monthlySavings, annual: annualSavings });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <TrendingDown className="w-8 h-8 text-green-600" />
          Résumé Global
        </h2>
        <button
          onClick={handleExportPDF}
          disabled={comparisons.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          <FileText className="w-5 h-5" />
          Exporter en PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Coût Mensuel Actuel</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalCurrentMonthly)}</p>
          <p className="text-xs text-gray-500 mt-1">({comparisons.length} copieur{comparisons.length > 1 ? 's' : ''})</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Coût Mensuel Proposé</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalProposedMonthly)}</p>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-green-200">
          <p className="text-sm text-gray-600 mb-2">Économies Mensuelles</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(monthlySavings)}</p>
          <p className="text-xs text-gray-500 mt-1">{totalCurrentMonthly > 0 ? ((monthlySavings / totalCurrentMonthly) * 100).toFixed(1) : 0}% de réduction</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-green-300">
          <p className="text-sm text-gray-600 mb-2">Économies Annuelles</p>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(annualSavings)}</p>
          <p className="text-xs text-gray-500 mt-1">Sur 12 mois</p>
        </div>
      </div>

      {comparisons.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Détail par Copieur</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Copieur</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actuel/mois</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Proposé/mois</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Économies</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">%</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((copier) => (
                  <tr key={copier.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{copier.name}</td>
                    <td className="text-right py-3 px-4 text-red-600">{formatCurrency(copier.current.monthlyTotal)}</td>
                    <td className="text-right py-3 px-4 text-green-600">{formatCurrency(copier.proposed.monthlyTotal)}</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-700">{formatCurrency(copier.monthlySavings)}</td>
                    <td className="text-right py-3 px-4 text-gray-600">{copier.savingsPercentage.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="bg-blue-50 font-bold">
                  <td className="py-3 px-4 text-gray-900">TOTAL</td>
                  <td className="text-right py-3 px-4 text-red-700">{formatCurrency(totalCurrentMonthly)}</td>
                  <td className="text-right py-3 px-4 text-green-700">{formatCurrency(totalProposedMonthly)}</td>
                  <td className="text-right py-3 px-4 text-green-700">{formatCurrency(monthlySavings)}</td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {totalCurrentMonthly > 0 ? ((monthlySavings / totalCurrentMonthly) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
