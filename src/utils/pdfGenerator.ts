import jsPDF from 'jspdf';
import { DetailedScore, subscales } from './scoring';

interface Answer {
  questionId: number;
  answer: string;
  question: string;
}

export const generatePDF = async (score: number, answers: Answer[], detailedScore: DetailedScore | null) => {
  try {
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

    // Bewertungsskala
    checkPageBreak(60);
    doc.setFontSize(14);
    doc.text('Bewertungsskala:', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    const scaleTexts = [
      '0-21 Punkte: Normaler Bereich - Keine auffälligen autistischen Züge',
      '22-25 Punkte: Grenzbereich - Einige autistische Züge können vorhanden sein',
      '26-31 Punkte: Erhöhter Bereich - Möglicherweise liegen autistische Züge vor',
      '32-50 Punkte: Hoher Bereich - Professionelle Beratung wird empfohlen'
    ];
    
    scaleTexts.forEach(text => {
      const textHeight = addWrappedText(text, margin, yPosition, 170, 10);
      yPosition += textHeight + 3;
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
    const disclaimerText = 'Dieser Test ist nur ein Screening-Instrument und ersetzt keine professionelle Diagnose. Bei Fragen oder Bedenken wenden Sie sich bitte an einen qualifizierten Facharzt oder Psychologen.';
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
      checkPageBreak(25);
      
      doc.setFontSize(10);
      doc.text(`${index + 1}. ${answer.question}`, margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(9);
      doc.text(`Antwort: ${answer.answer}`, margin + 5, yPosition);
      yPosition += 10;
    });

    // PDF speichern
    const fileName = `AQ-50_Ergebnis_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
  } catch (error) {
    console.error('Fehler beim Generieren der PDF:', error);
    alert('Fehler beim Erstellen der PDF-Datei. Bitte versuchen Sie es erneut.');
  }
};
