import type { DetailedScore } from './scoring';
import { subscales } from './scoring';

interface Answer {
  questionId: number;
  answer: string;
  question: string;
}

export const generatePDF = async (score: number, answers: Answer[], detailedScore: DetailedScore | null) => {
  try {
    // jspdf wird erst beim PDF-Export dynamisch geladen, um das initiale Bundle klein zu halten.
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    
    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
    };

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return lines.length * (fontSize * 0.4); // Return height used
    };

    // Titel
    doc.setFontSize(20);
    doc.text('AQ-50 Testergebnis - Detaillierte Auswertung', margin, yPosition);
    yPosition += 15;
    
    // Datum
    doc.setFontSize(12);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, margin, yPosition);
    yPosition += 15;
    
    // Gesamtergebnis
    doc.setFontSize(16);
    doc.text('Gesamtergebnis:', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(14);
    doc.text(`${score} von 50 möglichen Punkten`, margin, yPosition);
    yPosition += 15;

    // Interpretation
    if (detailedScore) {
      checkPageBreak(30);
      doc.setFontSize(14);
      doc.text('Interpretation:', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      const interpretationHeight = addWrappedText(detailedScore.interpretation, margin, yPosition, 170);
      yPosition += interpretationHeight + 10;
    }

    // Wissenschaftliche Einordnung
    checkPageBreak(55);
    doc.setFontSize(14);
    doc.text('Wissenschaftliche Einordnung:', margin, yPosition);
    yPosition += 10;
    const scaleTexts = [
      'Die Originalstudie schlug 32 oder mehr Punkte als nützlichen Schwellenwert für klinisch bedeutsame autistische Merkmale vor.',
      'Ein AQ-Wert ist keine Diagnose und kann Autismus weder bestätigen noch ausschließen. Die Vergleichswerte stammen aus den Studiengruppen von 2001.'
    ];
    scaleTexts.forEach(text => {
      const textHeight = addWrappedText(text, margin, yPosition, 170, 10);
      yPosition += textHeight + 4;
    });
    yPosition += 10;

    // Subskalen-Auswertung
    if (detailedScore) {
      checkPageBreak(80);
      doc.setFontSize(14);
      doc.text('Subskalen-Auswertung:', margin, yPosition);
      yPosition += 15;
      
      subscales.forEach(subscale => {
        checkPageBreak(25);
        const subscaleScore = detailedScore.subscaleScores[subscale.name];
        
        doc.setFontSize(12);
        doc.text(`${subscale.name}: ${subscaleScore.score}/${subscaleScore.maxScore} (${subscaleScore.percentage}%)`, margin, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        const descHeight = addWrappedText(subscale.description, margin + 5, yPosition, 165, 10);
        yPosition += descHeight + 8;
      });
    }

    // Wichtiger Hinweis
    checkPageBreak(40);
    doc.setFontSize(14);
    doc.text('Wichtiger Hinweis:', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    const disclaimerText = 'Dieser Selbsttest ist ein Screening-Instrument und ersetzt keine professionelle Diagnose. Angaben ohne Gewähr. Bei Fragen oder Leidensdruck wenden Sie sich bitte an qualifiziertes Fachpersonal.';
    const disclaimerHeight = addWrappedText(disclaimerText, margin, yPosition, 170, 10);
    yPosition += disclaimerHeight + 15;

    // Neue Seite für Antworten
    doc.addPage();
    yPosition = 20;
    
    doc.setFontSize(16);
    doc.text('Ihre Antworten im Detail:', margin, yPosition);
    yPosition += 15;
    
    // Antworten
    answers.forEach((answer, index) => {
      const questionLines = doc.splitTextToSize(`${index + 1}. ${answer.question}`, 170) as string[];
      checkPageBreak(questionLines.length * 4.5 + 14);
      doc.setFontSize(10);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 4.5 + 2;
      
      doc.setFontSize(9);
      doc.text(`Antwort: ${answer.answer}`, margin + 5, yPosition);
      yPosition += 9;
    });

    doc.addPage();
    yPosition = 20;
    doc.setFontSize(14);
    doc.text('Quellen:', margin, yPosition);
    yPosition += 10;
    const sources = [
      'Baron-Cohen S. et al. (2001). The Autism-Spectrum Quotient (AQ). Journal of Autism and Developmental Disorders, 31, 5-17. DOI: 10.1023/A:1005653411471',
      'Deutsche AQ-50-Fassung: Autism Research Centre, https://docs.autismresearchcentre.com/tests/AQ_Adult_German.pdf',
      'Freitag C. M. et al. (2007). Evaluation der deutschen Version des Autismus-Spektrum-Quotienten (AQ) - die Kurzversion AQ-k. DOI: 10.1026/1616-3443.36.4.280'
    ];
    sources.forEach(source => {
      const height = addWrappedText(source, margin, yPosition, 170, 10);
      yPosition += height + 6;
    });

    // PDF speichern
    const fileName = `AQ-50_Ergebnis_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
  } catch (error) {
    console.error('Fehler beim Generieren der PDF:', error);
    alert('Fehler beim Erstellen der PDF-Datei. Bitte versuchen Sie es erneut.');
  }
};
