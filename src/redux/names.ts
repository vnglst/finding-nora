// most popular names in NL in 2019
// source: https://www.svbkindernamen.nl/int/nl/kindernamen/wizard/zoeknaam/jongensnamen/jongens_populariteit.html

const girls = [
  "Emma",
  "Mila",
  "Sophie",
  "Zoë",
  "Julia",
  "Tess",
  "Sara",
  "Anna",
  "Evi",
  "Saar"
];

const boys = [
  "Noah",
  "Daan",
  "Lucas",
  "Levi",
  "Sem",
  "Finn",
  "Liam",
  "James",
  "Milan",
  "Luuk"
];

export const initialQuestions = ["Nora", "Tibo", ...girls, ...boys].map(s =>
  s.toUpperCase()
);
