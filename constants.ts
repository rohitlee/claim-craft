export const PATENT_RULES = `
- **Preamble:** Start with "A device..." or "A method..." to set the context.
- **Transitional Phrase:** Use "comprising," "consisting of," or "consisting essentially of." "Comprising" is open-ended and generally preferred.
- **Body:** List the essential elements of the invention.
- **Clarity:** Each element must be distinctly introduced. Use clear and unambiguous language.
- **Antecedent Basis:** Once an element is introduced (e.g., "a widget"), subsequent references must use a definite article (e.g., "the widget").
- **Single Sentence:** A claim must be a single sentence, however long.
`;

export const SCORING_RUBRIC = `
**Evaluation Criteria & Scoring:**

1.  **Clarity and Structure (30 points):**
    *   Does the claim follow the standard preamble, transitional phrase, and body structure?
    *   Is the language clear, concise, and unambiguous?
    *   Are antecedents for all elements clearly established?
    *   Score 30 if excellent, 20 if good with minor issues, 10 if has significant clarity issues, 0 if completely unclear.

2.  **Capturing Novelty (40 points):**
    *   Does the claim distinctly and accurately recite the novel features of the invention?
    *   Compare the user's claim against the provided "Novelty" description.
    *   Score 40 if all novel aspects are perfectly captured, 20-30 if partially captured, 10 if novel aspects are mentioned but not claimed properly, 0 if novelty is missed.

3.  **Capturing Inventive Step (30 points):**
    *   Does the claim define a combination of features that demonstrates an inventive step over the prior art (as implied by the inventive step description)?
    *   Does it go beyond an obvious combination of known elements?
    *   Score 30 if the inventive step is strongly established, 15-25 if it's present but could be stronger, 5-10 if it's weak, 0 if it's obvious.
`;
