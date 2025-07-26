import jsPDF from 'jspdf';

interface Answer {
  questionId: number;
  answer: string;
  question: string;
}

interface PDFData {
  score: number;
  answers: Answer[];
  date: string;
}

export const generatePDF = (data: PDFData) => {
  try {
    const doc = new jsPDF();
    
    // Titel
    doc.setFontSize(20);
    doc.text('AQ-50 Testergebnis - Detaillierte Auswertung', 20, 20);
    
    // Datum
    doc.setFontSize(12);
    doc.text(`Datum: ${data.date}`, 20, 35);
    
    // Gesamtergebnis
    doc.setFontSize(16);
    doc.text('Gesamtergebnis:', 20, 50);
    doc.setFontSize(14);
    doc.text(`AQ-50 Score: ${data.score} von 50 Punkten`, 20, 65);
    
    // Interpretation
    const getInterpretation = (score: number) => {
      if (score >= 32) {
        return "Ein Wert von 32 oder hoeher deutet auf eine hohe Wahrscheinlichkeit (80%) einer Autismus-Spektrum-Stoerung (ASS) hin.";
      } else if (score >= 26) {
        return "Ein Wert zwischen 26 und 31 deutet auf ein erhoehtes Mass autistischer Zuege hin (ca. 62,5% Wahrscheinlichkeit).";
      } else if (score >= 20) {
        return "Ein Wert zwischen 20 und 25 deutet auf ein mittleres Mass autistischer Zuege hin (ca. 50% Wahrscheinlichkeit).";
      } else {
        return "Ein Wert unter 20 deutet auf ein niedriges Mass autistischer Zuege hin. Der statistische Mittelwert fuer Personen ohne ASS liegt bei 16,4 (41% Wahrscheinlichkeit).";
      }
    };

    const getPercentage = (score: number) => {
      if (score >= 40) {
        return Math.min(100 + (score - 40) * 2.5, 125);
      } else if (score >= 32) {
        return 80 + (score - 32) * (20 / 8);
      } else if (score >= 25) {
        return 62.5 + (score - 25) * (17.5 / 7);
      } else if (score >= 20) {
        return 50 + (score - 20) * (12.5 / 5);
      } else if (score >= 16.4) {
        return 41 + (score - 16.4) * (9 / 3.6);
      } else {
        return score * (41 / 16.4);
      }
    };

    doc.text(`Wahrscheinlichkeit: ${getPercentage(data.score).toFixed(1)}%`, 20, 80);
    
    // Interpretation Text
    doc.setFontSize(12);
    const interpretation = getInterpretation(data.score);
    const splitInterpretation = doc.splitTextToSize(interpretation, 170);
    doc.text(splitInterpretation, 20, 95);
    
    // Referenzwerte
    let yPos = 95 + (splitInterpretation.length * 5) + 10;
    doc.setFontSize(14);
    doc.text('Referenzwerte nach AQ-50:', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    const referenceValues = [
      '16,4 Punkte: Statistischer Mittelwert bei Personen ohne ASS (41%)',
      '20 Punkte: 50% Wahrscheinlichkeit',
      '25 Punkte: 62,5% Wahrscheinlichkeit',
      '32 Punkte: 80% Wahrscheinlichkeit (Schwellwert fuer ASS)',
      '40 Punkte: 100% Wahrscheinlichkeit',
      '50 Punkte: 125% Wahrscheinlichkeit (maximaler Wert)'
    ];
    
    referenceValues.forEach(value => {
      doc.text(`• ${value}`, 25, yPos);
      yPos += 5;
    });
    
    // Neue Seite für detaillierte Antworten
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Detaillierte Antworten', 20, 20);
    
    yPos = 35;
    doc.setFontSize(10);
    
    // Sortiere Antworten nach Frage-ID
    const sortedAnswers = data.answers.sort((a, b) => a.questionId - b.questionId);
    
    sortedAnswers.forEach((answer) => {
      // Prüfen ob neue Seite benötigt wird
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      
      // Frage - entferne Umlaute für bessere PDF-Kompatibilität
      const cleanQuestion = answer.question
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/Ä/g, 'Ae')
        .replace(/Ö/g, 'Oe')
        .replace(/Ü/g, 'Ue')
        .replace(/ß/g, 'ss');
      
      const questionText = `${answer.questionId}. ${cleanQuestion}`;
      const splitQuestion = doc.splitTextToSize(questionText, 170);
      doc.text(splitQuestion, 20, yPos);
      yPos += splitQuestion.length * 4;
      
      // Antwort
      doc.setFontSize(9);
      const cleanAnswer = answer.answer
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/Ä/g, 'Ae')
        .replace(/Ö/g, 'Oe')
        .replace(/Ü/g, 'Ue')
        .replace(/ß/g, 'ss');
      
      doc.text(`Antwort: ${cleanAnswer}`, 25, yPos);
      yPos += 8;
      doc.setFontSize(10);
    });
    
    // Neue Seite für Disclaimer
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Wichtige Hinweise', 20, 20);
    
    doc.setFontSize(12);
    const disclaimer = [
      'Bitte beachten Sie, dass dieser Test nur ein Screening-Instrument ist und keine',
      'professionelle Diagnose ersetzt. Bei Fragen oder Bedenken wenden Sie sich bitte',
      'an einen qualifizierten Facharzt oder Psychologen.',
      '',
      'Fuer eine offizielle Diagnose und professionelle Unterstuetzung empfehlen wir:',
      '• Kontaktaufnahme mit dem Hausarzt fuer eine Ueberweisung',
      '• Suche nach spezialisierten Autismus-Ambulanzen',
      '• Kontakt mit oertlichen Autismus-Verbaenden',
      '• Anfrage bei der Krankenkasse nach spezialisierten Therapeuten',
      '',
      'Hilfreiche Ressourcen:',
      '• Bundesverband Autismus Deutschland e.V. (www.autismus.de)',
      '• Autismus-Kultur (www.autismus-kultur.de)',
      '• Asperger-Welt (www.asperger-welt.de)'
    ];
    
    yPos = 35;
    disclaimer.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // PDF speichern
    const fileName = `AQ-50_Auswertung_${data.date.replace(/\./g, '-')}.pdf`;
    doc.save(fileName);
    
  } catch (error) {
    console.error('Fehler beim Erstellen der PDF:', error);
    alert('Es gab einen Fehler beim Erstellen der PDF. Bitte versuchen Sie es erneut.');
  }
};
