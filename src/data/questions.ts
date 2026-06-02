// Zentrale Datenquelle für die 50 Fragen des AQ-50 Tests.
// Wird von Test.tsx, Results.tsx und der PDF-Generierung verwendet,
// damit die Fragetexte nur an einer Stelle gepflegt werden müssen.

export interface Question {
  id: number;
  text: string;
}

// Antwortmöglichkeiten der 4-stufigen Likert-Skala (Index 0–3).
export const answerOptions = [
  "Ich stimme nicht zu",
  "Ich stimme eher nicht zu",
  "Ich stimme eher zu",
  "Ich stimme zu",
] as const;

export const getAnswerLabel = (value: number): string => answerOptions[value] ?? "";

export const questions: Question[] = [
  { id: 1, text: "Ich tue Dinge lieber mit anderen gemeinsam als alleine." },
  { id: 2, text: "Ich mache Dinge am liebsten immer wieder auf dieselbe Art und Weise." },
  { id: 3, text: "Wenn ich mir etwas vorzustellen versuche, fällt es mir leicht, mir ein Bild davon in meinem Kopf zu machen." },
  { id: 4, text: "Ich lasse mich oft so stark von einer Sache gefangen nehmen, dass ich andere Dinge aus den Augen verliere." },
  { id: 5, text: "Oft bemerke ich kleine Geräusche, wenn andere nichts hören." },
  { id: 6, text: "Ich achte häufig auf Auto- und Kennzeichen oder ähnliche Abfolgen von Informationen." },
  { id: 7, text: "Andere Leute sagen mir oft, dass das, was ich gesagt habe, unhöflich sei, obwohl ich selbst denke, dass es höflich ist." },
  { id: 8, text: "Wenn ich mir eine Geschichte ausdenke, kann ich mir leicht vorstellen, wie die Charaktere aussehen könnten und wie sie sich verhalten würden." },
  { id: 9, text: "Ich bin fasziniert von Datumsangaben." },
  { id: 10, text: "In einer Gruppe kann ich verschiedenen Unterhaltungen mehrerer Leute mühelos folgen." },
  { id: 11, text: "Ich kann gut mit sozialen Situationen umgehen." },
  { id: 12, text: "Ich neige dazu, Details zu bemerken, die anderen nicht auffallen." },
  { id: 13, text: "Ich würde lieber in eine Bibliothek als auf eine Party gehen." },
  { id: 14, text: "Ich kann mir leicht Geschichten ausdenken." },
  { id: 15, text: "Ich fühle mich stärker zu Menschen als zu Dingen hingezogen." },
  { id: 16, text: "Ich neige dazu, sehr starke Interessen zu haben, und bin aufgebracht, wenn ich diesen nicht nachgehen kann." },
  { id: 17, text: "Ich genieße Small Talk." },
  { id: 18, text: "Wenn ich rede, ist es für andere nicht immer leicht, zu Wort zu kommen." },
  { id: 19, text: "Zahlen faszinieren mich." },
  { id: 20, text: "Wenn ich mir eine Geschichte anhöre oder lese, finde ich es schwierig, mir die Absichten der Charaktere vorzustellen." },
  { id: 21, text: "Ich lese nicht gerne Literatur." },
  { id: 22, text: "Ich finde es schwierig, neue Freunde zu finden." },
  { id: 23, text: "Ich bemerke ständig Muster in verschiedenen Dingen." },
  { id: 24, text: "Ich würde lieber ins Theater als in ein Museum gehen." },
  { id: 25, text: "Es stört mich nicht, wenn meine tägliche Routine unterbrochen wird." },
  { id: 26, text: "Ich bemerke oft, dass ich nicht weiß, wie man ein Gespräch am Laufen hält." },
  { id: 27, text: "Ich finde es leicht, zwischen den Zeilen zu lesen wenn jemand mit mir spricht." },
  { id: 28, text: "Ich konzentriere mich normalerweise mehr auf das Gesamtbild als auf kleine Details." },
  { id: 29, text: "Ich bin nicht sehr gut darin, mir Telefonnummern zu merken." },
  { id: 30, text: "Ich bemerke gewöhnlich keine kleinen Veränderungen in einer Situation oder im Erscheinungsbild einer Person." },
  { id: 31, text: "Ich kann merken, ob jemand, der mir zuhört, gelangweilt ist." },
  { id: 32, text: "Ich finde es leicht, mehr als eine Sache gleichzeitig zu tun." },
  { id: 33, text: "Am Telefon bin ich mir nicht sicher, wann ich an der Reihe bin zu sprechen." },
  { id: 34, text: "Ich unternehme Dinge gerne spontan." },
  { id: 35, text: "Ich kann oft vorhersagen, was jemand gleich tun wird." },
  { id: 36, text: "Ich bin gut darin, Situationen zu meistern, in denen es um gesellschaftliche Zusammenkünfte oder soziale Interaktionen geht." },
  { id: 37, text: "Wenn ich mit jemandem rede, fällt es mir leicht zu verstehen, was sie statt meiner sagen könnten." },
  { id: 38, text: "Ich bin oft in Dinge vertieft, die ich tue, sodass ich vergesse, was um mich herum passiert." },
  { id: 39, text: "Leute sagen mir, dass ich immer wieder auf dasselbe Thema zurückkomme." },
  { id: 40, text: "Als Kind mochte ich gerne Spiele spielen, bei denen man so tut, als wäre man jemand anderes." },
  { id: 41, text: "Ich sammle gerne Informationen über Kategorien von Dingen (z.B. Autotypen, Vogelarten, Zugarten, Pflanzenarten)." },
  { id: 42, text: "Ich finde es schwierig, mir vorzustellen, wie es wäre, jemand anderes zu sein." },
  { id: 43, text: "Ich plane sorgfältig alle Aktivitäten, die ich unternehme." },
  { id: 44, text: "Ich genieße soziale Anlässe." },
  { id: 45, text: "Ich finde es schwierig, die Absichten anderer Menschen zu erkennen." },
  { id: 46, text: "Neue Situationen machen mich ängstlich." },
  { id: 47, text: "Ich treffe gerne neue Menschen." },
  { id: 48, text: "Ich bin ein guter Diplomat." },
  { id: 49, text: "Ich bin nicht sehr gut darin, mich an Geburtsdaten zu erinnern." },
  { id: 50, text: "Ich finde es sehr leicht, mit Kindern Spiele zu spielen, bei denen man so tut, als wäre man jemand anderes." },
];
