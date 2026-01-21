import jsPDF from 'jspdf';
import { CopierComparison } from '../types/calculator';
import { formatCurrency } from './calculator';

export async function exportToPDF(comparisons: CopierComparison[], totalSavings: { monthly: number; annual: number }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Analyse ROI - Comparaison Copieurs', margin, yPosition);
  yPosition += 12;

  const today = new Date().toLocaleDateString('fr-FR');
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Date: ${today}`, margin, yPosition);
  yPosition += 8;

  doc.setDrawColor(52, 73, 94);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(34, 139, 34);
  doc.text('Résumé des Économies Totales', margin, yPosition);
  yPosition += 8;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Économies mensuelles: ${formatCurrency(totalSavings.monthly)}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Économies annuelles: ${formatCurrency(totalSavings.annual)}`, margin, yPosition);
  yPosition += 12;

  doc.setDrawColor(52, 73, 94);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  comparisons.forEach((comparison, index) => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${comparison.name}`, margin, yPosition);
    yPosition += 7;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Utilisation: ${comparison.bwCopies} N&B, ${comparison.colorCopies} Couleur/mois`, margin, yPosition);
    yPosition += 6;

    const rectY = yPosition;
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, rectY, pageWidth - 2 * margin, 45, 'F');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Solution Actuelle', margin + 3, yPosition + 4);
    doc.text('Solution Proposée', (pageWidth - margin) / 2 + 3, yPosition + 4);

    const colWidth = (pageWidth - 2 * margin) / 2;
    yPosition += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    const currentData = [
      `Loyer: ${formatCurrency(comparison.current.rentCost)}`,
      `Forfait: ${formatCurrency(comparison.current.basePackageCost)}`,
      `Supp. N&B: ${formatCurrency(comparison.current.extraBWCost)}`,
      `Supp. Couleur: ${formatCurrency(comparison.current.extraColorCost)}`,
    ];

    const proposedData = [
      `Loyer: ${formatCurrency(comparison.proposed.rentCost)}`,
      `Forfait: ${formatCurrency(comparison.proposed.basePackageCost)}`,
      `Supp. N&B: ${formatCurrency(comparison.proposed.extraBWCost)}`,
      `Supp. Couleur: ${formatCurrency(comparison.proposed.extraColorCost)}`,
    ];

    currentData.forEach((line, i) => {
      doc.text(line, margin + 3, yPosition + i * 4.5);
      doc.text(proposedData[i], (pageWidth - margin) / 2 + 3, yPosition + i * 4.5);
    });

    yPosition += 22;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(220, 20, 60);
    doc.text(`Mensuel: ${formatCurrency(comparison.current.monthlyTotal)}`, margin + 3, yPosition);
    doc.setTextColor(34, 139, 34);
    doc.text(`Mensuel: ${formatCurrency(comparison.proposed.monthlyTotal)}`, (pageWidth - margin) / 2 + 3, yPosition);

    yPosition += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 7;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(34, 139, 34);
    doc.text(`Économies: ${formatCurrency(comparison.monthlySavings)}/mois (${comparison.savingsPercentage.toFixed(1)}%)`, margin, yPosition);
    yPosition += 6;
    doc.text(`Annuelles: ${formatCurrency(comparison.annualSavings)}`, margin, yPosition);
    yPosition += 10;

    doc.setTextColor(0, 0, 0);
  });

  doc.save('analyse-roi-copieurs.pdf');
}
