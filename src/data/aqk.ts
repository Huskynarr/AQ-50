import type { Question } from './questions';

export const aqkSource = {
  title: 'Autismus Spektrum Quotient-Kurzversion AQ-K',
  questionnaireUrl: 'https://www.unimedizin-ffm.de/fileadmin/redakteure/Fachkliniken/Kinder-Jugendmedizin/Psychiatrie_I/AQ_Erwachsene.pdf',
  scoringUrl: 'https://www.unimedizin-ffm.de/fileadmin/redakteure/Fachkliniken/Kinder-Jugendmedizin/Psychiatrie_I/10_Links_Downloads/AUTISMUS_SPEKTRUM_QUOTIENT-KURZVERSION_AQ-K.pdf',
  studyUrl: 'https://doi.org/10.1026/1616-3443.36.4.280',
  verifiedOn: '2026-07-11',
} as const;

export const aqkQuestions: Question[] = [
  'Ich mache lieber Sachen mit anderen als alleine.', 'Ich mache bestimmte Sachen gerne immer wieder auf dieselbe Art und Weise.',
  'Wenn ich mir etwas vorzustellen versuche, fällt es mir sehr leicht, ein Bild im Kopf entstehen zu lassen.',
  'Andere Menschen sagen mir häufig, dass das, was ich gesagt habe, unhöflich war, obwohl ich denke, es sei höflich gewesen.',
  'Wenn ich eine Geschichte lese, kann ich mir leicht vorstellen, wie die Figuren in der Geschichte aussehen könnten.',
  'Ich kann in einer Gruppe leicht den Gesprächen von mehreren unterschiedlichen Menschen folgen.', 'In sozialen Situationen fühle ich mich wohl.',
  'Ich würde lieber in die Bibliothek als zu einer Party gehen.', 'Mir fällt es leicht, Geschichten zu erfinden.',
  'Ich fühle mich eher von Menschen als von Gegenständen angezogen.', 'Ich genieße Gespräche über Land und Leute.',
  'Wenn ich eine Geschichte lese, fällt es mir schwer, mir die Absichten der Figuren auszumalen.', 'Mir fällt es schwer, neue Freunde kennen zu lernen.',
  'Es macht mir nichts aus, wenn sich mein Tagesablauf verändert.', 'Ich stelle oft fest, dass ich nicht weiß, wie ich ein Gespräch aufrechterhalten kann.',
  'Es fällt mir leicht, Zwischentöne zu verstehen, wenn sich jemand mit mir unterhält.', 'Wenn ich mit jemandem rede, merke ich, wenn es ihm/ihr langweilig wird.',
  'Mir fällt es leicht, mehrere Sachen gleichzeitig zu machen.', 'Wenn ich mit jemandem telefoniere, weiß ich nicht genau, wann ich an der Reihe bin.',
  'Ich bin gerne spontan.', 'Ich verstehe Pointen bei einem Witz oft als allerletzte/r.',
  'Mir fällt es leicht herauszufinden, was jemand denkt, wenn ich nur auf ihr/sein Gesicht schaue.',
  'Wenn ich unterbrochen worden bin, kann ich schnell mit meiner vorherigen Tätigkeit weitermachen.', 'Mir macht es Spaß, mich mit Leuten zu unterhalten.',
  'Oft wird mir erzählt, dass ich ständig über dieselben Dinge spreche.', 'Als ich klein war, habe ich gerne Rollenspiele mit anderen Kindern gespielt.',
  'Mir fällt es schwer, mich in andere Personen hineinzuversetzen.', 'Ich genieße soziale Ereignisse.',
  'Mir fällt es schwer zu erkennen, was andere Menschen vorhaben.', 'Unbekannte Situationen ängstigen mich.', 'Ich lerne gerne neue Leute kennen.',
  'Ich bin sehr diplomatisch.', 'Mit fällt es leicht, Rollen- oder Phantasiespiele mit Kindern zu spielen.',
].map((text, index) => ({ id: index + 1, text }));

export const aqkAnswerOptions = ['Ich stimme überhaupt nicht zu', 'Ich stimme eher nicht zu', 'Ich stimme ein wenig zu', 'Ich stimme eindeutig zu'] as const;

const agreePoints = new Set([2, 4, 8, 12, 13, 15, 19, 21, 25, 27, 29, 30]);
const disagreePoints = new Set([1, 3, 5, 6, 7, 9, 10, 11, 14, 16, 17, 18, 20, 22, 23, 24, 26, 28, 31, 32, 33]);

export const calculateAqkScore = (answers: Record<number, number>) => aqkQuestions.reduce((score, question) => {
  const answer = answers[question.id];
  return score + (agreePoints.has(question.id) && answer >= 2 || disagreePoints.has(question.id) && answer <= 1 ? 1 : 0);
}, 0);
