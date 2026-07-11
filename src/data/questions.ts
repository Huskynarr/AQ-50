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
  { id: 1, text: "Ich mache Sachen lieber mit anderen als alleine." },
  { id: 2, text: "Ich bevorzuge immer wieder dieselben Dinge, und Dinge immer wieder auf dieselbe Art und Weise zu machen." },
  { id: 3, text: "Wenn ich eine Idee habe, sehe ich davon sehr leicht ein auto-visualisiertes – imaginiertes – Bild." },
  { id: 4, text: "In Aufgaben vertiefe ich mich oft so sehr, dass mir alle anderen Dinge ringsherum nicht mehr bewusst sind." },
  { id: 5, text: "Ich höre oft leise Geräusche, die andere nicht hören." },
  { id: 6, text: "Nummernschilder, Zeichen oder Symbole erwecken meine Assoziationen." },
  { id: 7, text: "Das, was ich sage oder tue, wird gelegentlich als unkonventionell oder indiskret wahrgenommen, obwohl es nicht so beabsichtigt war." },
  { id: 8, text: "Bei Geschichten stelle ich mir leicht vor, wie die Charaktere darin aussehen könnten." },
  { id: 9, text: "Uhrzeiten und Datumsangaben faszinieren mich." },
  { id: 10, text: "In einer Diskussion kann ich gleichzeitig verschiedenen Beiträgen folgen." },
  { id: 11, text: "In sozialen Situationen fühle ich mich wohl." },
  { id: 12, text: "Ich nehme intensiv und öfters Details wahr als andere, weil ich Dinge von anderen Perspektiven aus wahrnehme." },
  { id: 13, text: "Ich gehe lieber in eine Bibliothek als zu einer Party." },
  { id: 14, text: "Es ist mir leicht zu fantasieren, und Geschichten zu erfinden." },
  { id: 15, text: "Ich interessiere mich mehr für meine Mitmenschen als für Gegenstände, Räume oder Landschaften." },
  { id: 16, text: "Meine Neigungen entwickele ich aktiv, konstruktiv und zielorientiert, und bin glücklich, wenn dies möglich ist." },
  { id: 17, text: "Ich genieße es, zu tratschen." },
  { id: 18, text: "Wenn ich etwas vortrage, können mich andere kaum unterbrechen und es ist für das Publikum schwierig, mir zu folgen." },
  { id: 19, text: "Zahlen, Tabellen und Grafiken faszinieren mich." },
  { id: 20, text: "Bei der Literatur, bei Hörspielen oder im Theater ist es für mich schwierig, die Absichten der Charaktere zu erraten." },
  { id: 21, text: "Ich bevorzuge Sachbücher anstelle von Romanen." },
  { id: 22, text: "Es ist für mich schwierig, neue Freundschaften zu schließen." },
  { id: 23, text: "Mir fallen Regelmäßigkeiten an Sachen oder Zusammenhängen auf." },
  { id: 24, text: "Ich gehe lieber in ein Theater als in ein Museum." },
  { id: 25, text: "Ich bin flexibel, wenn sich mein gewohnter Tagesablauf verändert." },
  { id: 26, text: "Ich weiß oft nicht, wie ich eine Konversation aufrechterhalten soll." },
  { id: 27, text: "Zwischentöne – oder die eigentliche Botschaft – höre ich gut heraus; und kann gut zwischen den Zeilen lesen." },
  { id: 28, text: "Ich konzentriere mich mehr auf das Gesamtbild als auf Details." },
  { id: 29, text: "Telefon- und Kontonummern vergesse ich schnell." },
  { id: 30, text: "Kleine Veränderungen bei dem Erscheinungsbild von Personen oder in wiederkehrenden Situationen bemerke ich kaum." },
  { id: 31, text: "Wenn ich mich unterhalte oder spiele, merke ich, wenn es anfängt, den anderen zu langweilen." },
  { id: 32, text: "Es ist mir leicht, mehrere Sachen gleichzeitig zu tun." },
  { id: 33, text: "Wenn ich mich unterhalte, weiß ich nicht genau, wer gerade an der Reihe ist, das Wort zu ergreifen." },
  { id: 34, text: "Ich bin gerne spontan." },
  { id: 35, text: "Bei einem Witz verstehe ich die Pointen oft als allerletzte Person." },
  { id: 36, text: "Was jemand denkt oder fühlt, sehe ich an Gesicht und Blick." },
  { id: 37, text: "Wenn ich eine Pause mache oder unterbrochen werde, finde ich anschließend schnell wieder in eine angefangene Sache hinein." },
  { id: 38, text: "Es macht mir Freude, mit anderen einfach so dahinzuplaudern." },
  { id: 39, text: "Ich spreche immer über dieselben Dinge oder tue dieselben Dinge." },
  { id: 40, text: "Als ich jung war, spielte ich gerne Rollenspiele mit anderen Kindern." },
  { id: 41, text: "Ich sammle gerne Informationen und erforsche gerne Zusammenhänge in meinem Interessensgebiet." },
  { id: 42, text: "Es ist für mich schwierig, mich in andere hineinzuversetzen." },
  { id: 43, text: "Ich plane alle Sachen immer sehr gründlich und bereite mich eingehend auf Aktivitäten oder Situationen vor." },
  { id: 44, text: "Soziale Ereignisse oder Anlässe genieße ich." },
  { id: 45, text: "Die Absichten anderer zu erkennen oder vorauszuahnen, ist für mich schwierig." },
  { id: 46, text: "Situationen mit fremden Personen oder in unbekannten Räumen ängstigen mich." },
  { id: 47, text: "Ich mache gerne neue Bekanntschaften." },
  { id: 48, text: "Ich bin sehr diplomatisch." },
  { id: 49, text: "An Geburtstage erinnere ich mich ungenau." },
  { id: 50, text: "Es ist mir leicht, Fantasiespiele zu spielen, bei denen man schauspielern soll." },
];
