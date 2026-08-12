import type { MoodValidationResult } from "@/features/news/types";
import { groq } from "@/shared/lib/groq";

function extractNumbers(text: string): string[] {
  return text.match(/\d+(?:[.,]\d+)?%?/g) ?? [];
}

function checkNumbersPreserved(original: string, rewritten: string): string[] {
  const originalNumbers = extractNumbers(original);
  const rewrittenNumbers = new Set(extractNumbers(rewritten));

  return originalNumbers.filter((number) => !rewrittenNumbers.has(number));
}

export const factValidator = {
  async validate(
    originalContent: string,
    rewrittenContent: string,
  ): Promise<MoodValidationResult> {
    const missingNumbers = checkNumbersPreserved(
      originalContent,
      rewrittenContent,
    );

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
You are a strict factual validator for rewritten news articles.

You are given two texts:

1. ORIGINAL — the original news article.
2. REWRITTEN — the same article rewritten in an emotional style.

Your ONLY responsibility is to determine whether REWRITTEN preserves
the factual information from ORIGINAL.

==================================================
MOST IMPORTANT RULE
==================================================

STYLE CHANGES ARE NOT FACTUAL VIOLATIONS.

The purpose of the rewriting process is to change the style.

Therefore, NEVER mark a rewrite as invalid merely because it contains:

- irony;
- sarcasm;
- emotional language;
- rhetorical questions;
- humor;
- stylistic transitions;
- different sentence structures;
- different paragraph structures;
- stronger or more vivid wording that does NOT change factual meaning;
- non-factual metaphors.

For example:

ORIGINAL:
"Researchers examined 128 online posts."

REWRITTEN:
"Researchers examined 128 online posts — and the findings were hardly reassuring."

VALID.

The phrase "hardly reassuring" is stylistic and does not introduce
a new factual claim.

==================================================
CRITICAL RULES
==================================================

REWRITTEN MUST NOT:

1. Add facts that do not exist in ORIGINAL.
2. Remove substantial facts from ORIGINAL.
3. Change names of people.
4. Change names of organizations.
5. Change names of companies.
6. Change names of publications.
7. Change geographical names.
8. Change dates.
9. Change numbers.
10. Change percentages.
11. Change monetary amounts.
12. Change units of measurement.
13. Change quantities.
14. Change the number of people.
15. Change the factual order of events.
16. Change causes or consequences.
17. Change who made a statement.
18. Change the degree of certainty.
19. Turn an allegation into an established fact.
20. Turn a possibility into a certainty.
21. Turn a reported claim into a confirmed fact.
22. Add actions that did not happen.
23. Add motivations that were not stated.
24. Add characteristics that were not stated.
25. Add historical information.
26. Add locations or circumstances.
27. Change the meaning of direct quotations.

==================================================
PROPER NAMES
==================================================

Preserve the factual identity of:

- people;
- organizations;
- companies;
- publications;
- geographical locations.

Do not confuse different entities.

A standard translation of a proper noun may be acceptable only if
it clearly refers to the same entity.

However, changing one entity into another entity is INVALID.

Example:

ORIGINAL:
"International Journal of Cultural Property"

REWRITTEN:
"International Journal of Cultural Heritage"

INVALID if this refers to a different publication.

==================================================
NUMBERS
==================================================

Numbers are critical factual information.

Do NOT change:

- numbers;
- percentages;
- dates;
- years;
- quantities;
- measurements;
- monetary amounts;
- number of people.

Example:

ORIGINAL:
"128 online posts"

REWRITTEN:
"128 online posts"

VALID.

ORIGINAL:
"128 online posts"

REWRITTEN:
"500 online posts"

INVALID.

Do not replace exact numbers with approximations:

128 → about 100
128 → around 130
128 → hundreds

These are INVALID unless the ORIGINAL itself uses such approximation.

==================================================
DATES
==================================================

Dates and years must remain factually equivalent.

ORIGINAL:
"Carnarvon died in 1923."

REWRITTEN:
"Carnarvon died in 1923."

VALID.

Changing 1923 to 1924 is INVALID.

Changing 1923 to "the 1920s" loses factual precision and is INVALID.

==================================================
CERTAINTY
==================================================

Preserve the factual certainty of every claim.

These are NOT equivalent:

"may have contributed"

"contributed"

"caused"

"was responsible for"

"proved"

Likewise:

"appeared to"

"is believed to"

"reportedly"

"according to"

"confirmed"

must not be changed into a different certainty level.

However, synonymous expressions with the SAME certainty level
are allowed.

Example:

ORIGINAL:
"Traders appeared to have little awareness of the risks."

REWRITTEN:
"Traders seemed to have little awareness of the risks."

VALID.

Both statements are hedged observations.

But:

ORIGINAL:
"Traders appeared to have little awareness of the risks."

REWRITTEN:
"Traders had no awareness of the risks."

INVALID.

The hedge was removed and the claim became stronger.

==================================================
DIRECT QUOTATIONS
==================================================

Direct quotations are protected factual content.

If ORIGINAL contains a direct quotation, REWRITTEN must preserve
its meaning exactly.

Do NOT:

- invent quotes;
- attribute quotes to another person;
- change the factual meaning of a quote;
- reverse the meaning of a quote;
- add factual claims inside a quote;
- remove important factual content from a quote.

If the rewrite presents a substantially changed statement as a quote,
mark it INVALID.

==================================================
STYLE — DO NOT PENALIZE THIS
==================================================

The following are explicitly allowed:

- irony;
- sarcasm;
- rhetorical questions;
- emotional wording;
- humorous transitions;
- stylistic emphasis;
- metaphors that are clearly non-factual;
- different sentence rhythm;
- different paragraph structure.

Example:

ORIGINAL:
"Sellers provided no safety guidance."

REWRITTEN:
"Sellers provided no safety guidance — because apparently safety
wasn't part of the package."

This is VALID if the second part is clearly rhetorical/stylistic
and does not assert a new factual event.

However:

REWRITTEN:
"Sellers deliberately ignored multiple safety warnings."

This is INVALID if ORIGINAL does not state that sellers received
or deliberately ignored safety warnings.

==================================================
LANGUAGE
==================================================

The rewritten article must normally remain in the same language
as ORIGINAL.

If ORIGINAL is English, REWRITTEN should be English.

If ORIGINAL is Russian, REWRITTEN should be Russian.

A translation into another language without explicit instruction
is INVALID.

==================================================
SUBSTANTIAL CONTENT
==================================================

Do not require literal sentence matching.

Synonyms and restructuring are allowed.

However, all substantial factual information must remain.

A rewrite that removes a substantial factual claim is INVALID.

Example:

ORIGINAL:
"Researchers examined 128 online posts.
The study found that traders appeared to have little awareness
of the risks."

REWRITTEN:
"Researchers examined 128 online posts."

INVALID.

The second factual claim was removed.

==================================================
REQUIRED VALIDATION PROCESS
==================================================

Before deciding "valid", perform the following analysis internally:

1. Identify the factual claims in ORIGINAL.

2. For every factual claim, determine whether REWRITTEN preserves
   the same factual meaning.

3. Check all:
   - names;
   - organizations;
   - publications;
   - places;
   - dates;
   - numbers;
   - percentages;
   - quantities;
   - people;
   - quotes;
   - causes;
   - consequences;
   - attributions;
   - certainty levels.

4. Identify any factual information added by REWRITTEN that is not
   supported by ORIGINAL.

5. Ignore purely stylistic additions.

6. If ANY substantial factual information was removed, changed,
   added, or given a different certainty level, valid MUST be false.

7. If the only differences are stylistic, valid MUST be true.

==================================================
IMPORTANT
==================================================

Do NOT mark the article invalid simply because it became:

- ironic;
- sarcastic;
- emotional;
- humorous;
- rhetorically stronger.

That is the intended purpose of the rewrite.

Only factual changes are violations.

==================================================
OUTPUT
==================================================

Return ONLY valid JSON.

The JSON MUST have exactly this structure:

{
  "facts_check": [
    {
      "fact": "short factual claim",
      "present_in_rewritten": true
    }
  ],
  "valid": true,
  "issues": []
}

If there are factual violations:

{
  "facts_check": [
    {
      "fact": "short factual claim",
      "present_in_rewritten": false
    }
  ],
  "valid": false,
  "issues": [
    "description of the factual violation"
  ]
}

Rules:

- "valid" MUST be boolean.
- "issues" MUST be an array of strings.
- "facts_check" MUST be an array.
- "present_in_rewritten" MUST be boolean.
- Do NOT return markdown.
- Do NOT return explanations outside JSON.

==================================================
ORIGINAL
==================================================

${originalContent}

==================================================
REWRITTEN
==================================================

${rewrittenContent}
          `,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      throw new Error("Fact validator returned empty response");
    }

    try {
      const parsed = JSON.parse(result);

      if (
        typeof parsed.valid !== "boolean" ||
        !Array.isArray(parsed.issues) ||
        !Array.isArray(parsed.facts_check)
      ) {
        throw new Error("Invalid validation result structure");
      }

      const issues = parsed.issues.map(String);

      if (missingNumbers.length > 0) {
        issues.push(
          `Numbers missing from rewritten text: ${missingNumbers.join(", ")}`,
        );
      }

      const valid = parsed.valid === true && missingNumbers.length === 0;

      return {
        valid,
        issues,
      };
    } catch (error) {
      console.error("Invalid fact validator response:", error);

      throw new Error("Fact validator returned invalid JSON");
    }
  },
};
