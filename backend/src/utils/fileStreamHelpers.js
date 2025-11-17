const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const xlsx = require("xlsx");
const { Document, Packer, Paragraph } = require("docx");
const streamToBuffer = require("stream-to-array");

// Utility: Stream to Buffer from S3 GetObjectResponse Body
const streamToBufferHelper = async (stream) => {
  const chunks = await streamToBuffer(stream);
  return Buffer.concat(chunks);
};

// Document parsing for both PDF and DOCX formats
const parseDocument = async (dataBuffer) => {
  try {
    const parsedPDF = await pdfParse(dataBuffer);
    return parsedPDF.text.split("\n\n").filter(Boolean);
  } catch {
    try {
      const { value } = await mammoth.extractRawText({ buffer: dataBuffer });
      return value.split("\n\n").filter(Boolean);
    } catch {
      throw new Error("Unsupported document format");
    }
  }
};

// Create XLSX file in buffer (checksheet output)
const createChecksheetXLS = async (aiText) => {
  const wb = xlsx.utils.book_new();

  const lines = aiText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    throw new Error("AI returned empty checksheet text");
  }
  const header = lines[0].split("|").map((col) => col.trim());

  const dataRows = lines
    .slice(1)
    .map((line) => line.split("|").map((col) => col.trim()));

  const rows = [header, ...dataRows];
  const ws = xlsx.utils.aoa_to_sheet(rows);
  xlsx.utils.book_append_sheet(wb, ws, "Checksheet");

  return xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
};

// Create DOCX work instruction file buffer
const createWorkInstructionDOCX = async (aiText) => {
  const doc = new Document({
    sections: [
      {
        children: aiText.split("\n").map((line) => new Paragraph(line)),
      },
    ],
  });
  return await Packer.toBuffer(doc);
};
module.exports = {
  streamToBufferHelper,
  parseDocument,
  createChecksheetXLS,
  createWorkInstructionDOCX,
};
