module.exports.checkSheetPrompt = (manualContent) => {
  return `You are a maintenance engineer and technical writer.

Create a technician checksheet from the manual content below.
The checksheet will be used in an XLSX (Excel) file, so each column must map cleanly to an Excel column.

MANUAL_CONTENT:
"""
${manualContent}
"""

REQUIREMENTS:
- Use only information from MANUAL_CONTENT (no invented values).
- Break the procedure into clear, atomic steps a technician can tick.
- Include limits, setpoints, tools, and PPE whenever mentioned.
- If something is not specified, write "Not specified in provided text" or "As per OEM specification".

OUTPUT:
- The table must be in a clear tabular form that an AI or script can convert to an XLSX sheet.

Respond now with only the table following these rules. `;
};

module.exports.workInstructionPrompt = (manualContent) => {
  return `
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
};
