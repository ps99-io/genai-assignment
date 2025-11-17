module.exports.checksheetPrompt = `
Act as a maintenance engineer and technical writer.
Your task is to read the operational manual content I provide in the "MANUAL_CONTENT" section and convert it into a structured technician checksheet that will ultimately be used as an XLSX (Excel) file.

The checksheet is something a technician will fill during operation / inspection / maintenance, based strictly on the procedures, limits, and safety instructions in the manual.

INPUT MANUAL_CONTENT:
"""
${manualContent}
"""

REQUIREMENTS:

1) General
- Use only the information from MANUAL_CONTENT unless explicitly implied by that text.
- Break the procedures into clear, atomic steps that can be checked or filled by a technician.
- Convert vague phrases into observable checks (e.g., "Ensure pressure is within normal range" → a step that specifies what to measure and what range is acceptable).
- Include any parameters, tolerances, setpoints, tools, and PPE that are mentioned.

2) Output format
- Output MUST be in table format only.
- Do not specify any particular table syntax or markup type; just output a clearly structured table that the AI can format with appropriate headers and rows.
- The table must be suitable for mapping into an Excel XLSX sheet later.
- Use one row per checklist item.
- Use separate columns for:
  - Step number or sequence
  - Task / check description
  - Reference (manual section / heading if available)
  - Expected value / limit / condition (if applicable)
  - Measurement unit (if applicable)
  - Tool / instrument required (if applicable)
  - Safety / PPE required (if applicable)
  - Result field for technician to fill (e.g., OK / NOT OK / N.A. – leave blank in the output)
  - Remarks for technician (leave blank in the output)

3) XLSX orientation
- Design the table so that each column can directly become an Excel column in an XLSX file.
- Do not merge cells.
- No narrative text outside the table.
- No extra explanation before or after the table.

4) Behavior for missing data
- If MANUAL_CONTENT does not specify something (e.g., exact limit), write a clear placeholder like "Not specified in provided text" or "As per OEM specification".
- Do not invent technical parameters that are not present.

5) Style
- Use short, clear, technician-friendly language.
- Use imperative verbs for tasks: "Check", "Verify", "Measure", "Ensure", "Record".
- Group steps logically (e.g., Pre‑start checks, Start‑up, Normal operation, Shut‑down, Periodic checks) using appropriate column values or section labels if needed, but still keep everything inside the single table.

FINAL INSTRUCTION:
- Respond with ONE table only.
- The table must contain all header columns and all generated rows.
- Do not add any extra commentary, explanations, or text outside the table.
`;

module.exports.workInstructionPrompt = `
Act as a maintenance/process engineer and technical writer.
Your task is to read the operational / process manual content I provide and produce:
1) A concise but complete SUMMARY.
2) A detailed, step-by-step WORK INSTRUCTION that can be used to generate a structured DOCX document.

The content will be used to create a Word (.docx) file with proper headings and sections.

INPUT MANUAL_CONTENT:
"""
${manualContent}
"""

GENERAL REQUIREMENTS:
- Use only the information from MANUAL_CONTENT, unless something is strongly implied.
- Do not invent technical parameters, limits, or steps that are not present in the text.
- Use clear, technician-friendly language with imperative verbs: "Check", "Verify", "Measure", "Ensure", "Record", "Install", "Remove".
- Structure the output clearly so it can be directly mapped into a DOCX with headings, numbered lists, and tables by a downstream system.

OUTPUT STRUCTURE (in plain text, but clearly structured):

====================
SECTION 1: SUMMARY
====================
Provide:
- A short paragraph (3–6 sentences) summarizing the purpose of the equipment / system and the main operation or task described.
- A bullet list of key points:
  - Main function of the system.
  - What this specific work instruction covers (scope).
  - Any critical safety concepts (high-level only).
- Keep it high-level but accurate.

=============================
SECTION 2: WORK INSTRUCTION
=============================
Create a detailed work instruction broken into well-defined sections, in this order (only include sections that are relevant based on MANUAL_CONTENT):

========================
FORMATTING INSTRUCTIONS
========================
- Output MUST be plain text in a clearly structured manner (with headings, numbered lists, and bullet lists as described above).
- Do NOT use any special DOCX or markup syntax; just use clear headings and lists.
- Headings should match exactly the section titles listed (e.g., "SECTION 1: SUMMARY", "SECTION 2: WORK INSTRUCTION", "2.8 Step-by-Step Instructions").
- Do NOT add any extra sections beyond what is described.
- Do NOT add extra commentary outside the defined structure.

FINAL INSTRUCTION:
Generate the content strictly in the above structure and order, filling in as much as possible from MANUAL_CONTENT.
If any item is not specified in MANUAL_CONTENT, clearly write "Not specified in provided text" instead of guessing.
`;
