import { Copier } from '../types/calculator';
import { compareResults } from '../utils/calculator';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface CopierCardProps {
  copier: Copier;
  onUpdate: (copier: Copier) => void;
  onDelete: (id: string) => void;
}

export default function CopierCard({ copier, onUpdate, onDelete }: CopierCardProps) {
  const comparison = compareResults(copier.current, copier.proposed, {
    bwCopies: copier.bwCopies,
    colorCopies: copier.colorCopies,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...copier, name: e.target.value });
  };

  const handleCurrentChange = (field: keyof typeof copier.current, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate({
      ...copier,
      current: { ...copier.current, [field]: numValue },
    });
  };

  const handleProposedChange = (field: keyof typeof copier.proposed, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate({
      ...copier,
      proposed: { ...copier.proposed, [field]: numValue },
    });
  };

  const handleUsageChange = (field: 'bwCopies' | 'colorCopies', value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate({ ...copier, [field]: numValue });
  };

  const isSaving = comparison.monthlySavings > 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: isSaving ? '#22c55e' : '#ef4444' }}>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={copier.name}
          onChange={handleNameChange}
          className="text-xl font-bold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1 flex-1"
          placeholder="Nom du copieur"
        />
        <button
          onClick={() => onDelete(copier.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3">Utilisation Mensuelle</h4>
          <div className="space-y-2">
            <input
              type="number"
              min="0"
              value={copier.bwCopies || ''}
              onChange={(e) => handleUsageChange('bwCopies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Copies N&B"
            />
            <input
              type="number"
              min="0"
              value={copier.colorCopies || ''}
              onChange={(e) => handleUsageChange('colorCopies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Copies Couleur"
            />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Résultats</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Mensuel actuel:</span>
              <span className="font-bold text-red-600">{formatCurrency(comparison.current.monthlyTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Mensuel proposé:</span>
              <span className="font-bold text-green-600">{formatCurrency(comparison.proposed.monthlyTotal)}</span>
            </div>
            <div className="flex justify-between bg-gray-50 p-2 rounded">
              <span className="text-gray-700 font-semibold text-sm">Économies:</span>
              <span className={`font-bold ${isSaving ? 'text-green-600' : 'text-red-600'}`}>
                {isSaving ? '+' : ''}{formatCurrency(comparison.monthlySavings)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-semibold text-red-900 mb-3 text-sm">Solution Actuelle</h4>
          <div className="space-y-2 text-sm">
            <input
              type="number"
              step="0.01"
              min="0"
              value={copier.current.rent || ''}
              onChange={(e) => handleCurrentChange('rent', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-transparent"
              placeholder="Loyer"
            />
            <input
              type="number"
              min="0"
              value={copier.current.packageBW || ''}
              onChange={(e) => handleCurrentChange('packageBW', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-transparent"
              placeholder="Copies N&B"
            />
            <input
              type="number"
              min="0"
              value={copier.current.packageColor || ''}
              onChange={(e) => handleCurrentChange('packageColor', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-transparent"
              placeholder="Copies Couleur"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              value={copier.current.packageFixedCost || ''}
              onChange={(e) => handleCurrentChange('packageFixedCost', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-transparent"
              placeholder="Forfait fixe"
            />
            <input
              type="number"
              step="0.001"
              min="0"
              value={copier.current.costPerExtraBW || ''}
              onChange={(e) => handleCurrentChange('costPerExtraBW', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-transparent"
              placeholder="€/page N&B"
            />
            <input
              type="number"
              step="0.001"
              min="0"
              value={copier.current.costPerExtraColor || ''}
              onChange={(e) => handleCurrentChange('costPerExtraColor', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:border-transparent"
              placeholder="€/page Couleur"
            />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-900 mb-3 text-sm">Solution Proposée</h4>
          <div className="space-y-2 text-sm">
            <input
              type="number"
              step="0.01"
              min="0"
              value={copier.proposed.rent || ''}
              onChange={(e) => handleProposedChange('rent', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
              placeholder="Loyer"
            />
            <input
              type="number"
              min="0"
              value={copier.proposed.packageBW || ''}
              onChange={(e) => handleProposedChange('packageBW', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
              placeholder="Copies N&B"
            />
            <input
              type="number"
              min="0"
              value={copier.proposed.packageColor || ''}
              onChange={(e) => handleProposedChange('packageColor', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
              placeholder="Copies Couleur"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              value={copier.proposed.packageFixedCost || ''}
              onChange={(e) => handleProposedChange('packageFixedCost', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
              placeholder="Forfait fixe"
            />
            <input
              type="number"
              step="0.001"
              min="0"
              value={copier.proposed.costPerExtraBW || ''}
              onChange={(e) => handleProposedChange('costPerExtraBW', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
              placeholder="€/page N&B"
            />
            <input
              type="number"
              step="0.001"
              min="0"
              value={copier.proposed.costPerExtraColor || ''}
              onChange={(e) => handleProposedChange('costPerExtraColor', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent"
              placeholder="€/page Couleur"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
