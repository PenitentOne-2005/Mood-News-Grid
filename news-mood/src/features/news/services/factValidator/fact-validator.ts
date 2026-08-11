import { groq } from "@/shared/lib/groq";
import type { MoodValidationResult } from "../../types";

function extractNumbers(text: string): string[] {
  return text.match(/\d+([.,]\d+)?%?/g) ?? [];
}

function checkNumbersPreserved(original: string, rewritten: string): string[] {
  const origNums = extractNumbers(original);
  const rewrittenNums = new Set(extractNumbers(rewritten));
  return origNums.filter((n) => !rewrittenNums.has(n));
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
 
Your task is to determine whether REWRITTEN preserves the factual content of ORIGINAL.
 
IMPORTANT:
The rewritten article is allowed to change STYLE.
It is NOT allowed to change INFORMATION.
 
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
13. Change quantities or number of people.
14. Change the order of factual events.
15. Change causes or consequences.
16. Change who made a statement.
17. Change the certainty of a statement.
18. Turn an allegation into an established fact.
19. Turn a possibility into a certainty.
20. Turn a reported claim into a confirmed fact.
21. Add new actions, motivations or characteristics to people.
22. Add historical information that does not exist in ORIGINAL.
23. Add new locations or circumstances.
 
==================================================
NAMES AND PROPER NOUNS
==================================================
 
Names, organizations, companies, publications and geographical names
must preserve their factual identity.
 
Translation of a proper noun may be acceptable only when it is clearly
the standard translation of the same entity.
 
However, changing the entity itself is NOT acceptable.
 
For example:
 
ORIGINAL:
"International Journal of Cultural Property"
 
REWRITTEN:
"International Journal of Cultural Heritage"
 
This is INVALID because these are different publication names.
 
==================================================
NUMBERS
==================================================
 
Numbers must remain exactly factually equivalent.
 
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
 
Do not allow approximate replacements such as:
 
128 → about 100
128 → hundreds
128 → around 130
 
unless the original itself uses an approximation.
 
==================================================
DATES
==================================================
 
Dates must not change.
 
If ORIGINAL says:
 
"1923"
 
REWRITTEN must not say:
 
"1924"
"the 1920s"
"more than a century ago"
 
unless that wording preserves the exact factual meaning without losing
the original date.
 
==================================================
CERTAINTY
==================================================
 
Preserve the exact degree of certainty.
 
These are NOT equivalent:
 
"may have contributed"
 
"did contribute"
 
"was responsible for"
 
"caused"
 
"proved"
 
Similarly:
 
"appeared to have"
 
"is believed to have"
 
"reportedly"
 
"according to"
 
"confirmed"
 
must not be upgraded or downgraded in certainty.
 
However, replacing a hedge word with a SYNONYMOUS hedge word of the
SAME certainty category is allowed and is NOT a violation. Only flag
a change when the certainty CATEGORY itself changes (for example,
hedged/possible becomes unhedged/confirmed, or vice versa).
 
Example of an ALLOWED change (same category — both are hedged,
uncertain claims):
 
ORIGINAL:
"Traders appeared to have little awareness of the risks."
 
REWRITTEN:
"Traders seemed to have almost no idea what risks they were running."
 
This is VALID. "appeared to" and "seemed to" are synonymous hedges,
and "little awareness" and "almost no idea" describe the same degree
of ignorance. No certainty category changed.
 
Example of a VIOLATION (category changes from hedged to confirmed):
 
ORIGINAL:
"Traders appeared to have little awareness of the risks."
 
REWRITTEN:
"Traders had no awareness of the risks."
 
This is INVALID because the hedge ("appeared to") was dropped entirely,
turning a possibility into a stated fact.
 
==================================================
DIRECT QUOTES
==================================================
 
Direct quotes are CRITICAL.
 
Any text presented as a direct quote in ORIGINAL must remain
substantively and factually identical in REWRITTEN.
 
Do NOT allow:
 
- changing the meaning of a quote;
- inventing a quote;
- attributing a quote to another person;
- adding words to a quote;
- removing important parts of a quote;
- changing factual claims inside a quote.
 
If the original article contains a direct quote and REWRITTEN
substantially paraphrases it while presenting it as a quote,
mark this as INVALID.
 
==================================================
LANGUAGE
==================================================
 
REWRITTEN should normally use the same language as ORIGINAL.
 
If ORIGINAL is written in English, REWRITTEN should be in English.
 
If REWRITTEN is translated into another language without an explicit
instruction to translate, mark this as INVALID.
 
Do not confuse ordinary stylistic rewriting with translation.
 
==================================================
STYLE
==================================================
 
The following changes are allowed:
 
- word choice;
- sentence structure;
- sentence length;
- paragraph structure;
- rhythm;
- emotional tone;
- irony;
- sarcasm;
- rhetorical questions;
- stylistic transitions;
- non-factual metaphors.
 
However, stylistic additions must NOT introduce new factual claims.
 
For example:
 
ORIGINAL:
"Researchers examined 128 online posts."
 
REWRITTEN:
"Researchers examined 128 online posts — and the results were hardly reassuring."
 
This MAY be valid if "hardly reassuring" is clearly stylistic
and does not introduce a new factual claim.
 
But:
 
ORIGINAL:
"Researchers examined 128 online posts."
 
REWRITTEN:
"Researchers examined 500 online posts."
 
INVALID.
 
Another example:
 
ORIGINAL:
"Traders appeared to have little awareness of the risks."
 
REWRITTEN:
"Traders were completely reckless and knew exactly what they were doing."
 
INVALID.
 
The rewritten version changes the characterization and certainty.
 
==================================================
DO NOT REQUIRE LITERAL MATCHING
==================================================
 
Do not reject a rewrite simply because sentences are worded differently.
 
The following are allowed:
 
- synonyms;
- different sentence structures;
- different paragraph structures;
- stylistic expressions;
- emotional language.
 
Judge whether the underlying factual meaning remains unchanged.
 
==================================================
REQUIRED PROCESS (do this before deciding)
==================================================
 
Step 1: List every atomic factual claim from ORIGINAL as short items —
this includes names, numbers, dates, places, quotes, causes, consequences,
statements attributed to someone, and any claim about awareness, risk,
intent, or certainty. Every sentence that carries information must produce
at least one item.
 
Step 2: For each item, check whether it is present in REWRITTEN with the
same meaning and the same degree of certainty. Mark it present or missing.
 
Step 3: If ANY item is missing, altered, or has a different certainty
level, "valid" MUST be false and it MUST be described in "issues".
 
==================================================
OUTPUT FORMAT
==================================================
 
Return ONLY valid JSON with this exact shape:
 
{
  "facts_check": [
    { "fact": "short description", "present_in_rewritten": true }
  ],
  "valid": true,
  "issues": []
}
 
If there are violations, "valid" must be false and "issues" must list
each one:
 
{
  "facts_check": [
    { "fact": "short description", "present_in_rewritten": false }
  ],
  "valid": false,
  "issues": [
    "description of the first factual violation",
    "description of the second factual violation"
  ]
}
 
The "facts_check" field MUST be an array of objects.
The "valid" field MUST be a boolean.
The "issues" field MUST be an array of strings.
 
Do NOT return markdown.
 
Do NOT return explanations outside JSON.
 
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

      if (typeof parsed.valid !== "boolean" || !Array.isArray(parsed.issues)) {
        throw new Error("Invalid validation result structure");
      }

      const issues = parsed.issues.map(String);

      if (missingNumbers.length > 0) {
        issues.push(
          `Numbers missing from rewritten text: ${missingNumbers.join(", ")}`,
        );
      }

      return {
        valid: parsed.valid && missingNumbers.length === 0,
        issues,
      };
    } catch (error) {
      console.error("Invalid fact validator response:", error);

      throw new Error("Fact validator returned invalid JSON");
    }
  },
};
