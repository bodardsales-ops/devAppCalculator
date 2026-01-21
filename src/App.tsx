import { useState } from 'react';
import { Copier, CopierComparison } from './types/calculator';
import { compareResults } from './utils/calculator';
import CopierCard from './components/CopierCard';
import SummaryAndExport from './components/SummaryAndExport';
import { Calculator, Plus } from 'lucide-react';

function App() {
  const [copiers, setCopiers] = useState<Copier[]>([
    {
      id: '1',
      name: 'Copieur Principal',
      current: {
        rent: 100,
        packageBW: 500,
        packageColor: 200,
        packageFixedCost: 50,
        costPerExtraBW: 0.01,
        costPerExtraColor: 0.05,
      },
      proposed: {
        rent: 80,
        packageBW: 600,
        packageColor: 300,
        packageFixedCost: 40,
        costPerExtraBW: 0.008,
        costPerExtraColor: 0.045,
      },
      bwCopies: 1000,
      colorCopies: 500,
    },
  ]);

  const comparisons: CopierComparison[] = copiers.map((copier) => {
    const result = compareResults(copier.current, copier.proposed, {
      bwCopies: copier.bwCopies,
      colorCopies: copier.colorCopies,
    });
    return {
      ...result,
      id: copier.id,
      name: copier.name,
      bwCopies: copier.bwCopies,
      colorCopies: copier.colorCopies,
    };
  });

  const handleAddCopier = () => {
    const newId = (Math.max(...copiers.map((c) => parseInt(c.id))) + 1).toString();
    const newCopier: Copier = {
      id: newId,
      name: `Copieur ${newId}`,
      current: {
        rent: 100,
        packageBW: 500,
        packageColor: 200,
        packageFixedCost: 50,
        costPerExtraBW: 0.01,
        costPerExtraColor: 0.05,
      },
      proposed: {
        rent: 80,
        packageBW: 600,
        packageColor: 300,
        packageFixedCost: 40,
        costPerExtraBW: 0.008,
        costPerExtraColor: 0.045,
      },
      bwCopies: 1000,
      colorCopies: 500,
    };
    setCopiers([...copiers, newCopier]);
  };

  const handleUpdateCopier = (updatedCopier: Copier) => {
    setCopiers(copiers.map((c) => (c.id === updatedCopier.id ? updatedCopier : c)));
  };

  const handleDeleteCopier = (id: string) => {
    if (copiers.length > 1) {
      setCopiers(copiers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Calculateur ROI Copieurs
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Comparez vos solutions et découvrez vos économies potentielles
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gérer vos copieurs</h2>
            <button
              onClick={handleAddCopier}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              <Plus className="w-5 h-5" />
              Ajouter un copieur
            </button>
          </div>

          <div className="space-y-6">
            {copiers.map((copier) => (
              <CopierCard
                key={copier.id}
                copier={copier}
                onUpdate={handleUpdateCopier}
                onDelete={handleDeleteCopier}
              />
            ))}
          </div>
        </div>

        <SummaryAndExport comparisons={comparisons} />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Tous les montants sont calculés en euros (€). Les économies sont basées sur
            l'utilisation mensuelle réelle comparée aux forfaits disponibles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
