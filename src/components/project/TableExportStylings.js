// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

/** @typedef {import("@cj-tech-master/excelts").Worksheet} Worksheet */

const tableStylings = {
  startRow: 2,

  /** @param {Worksheet} sheet */
  applyAllStylings(sheet) {
    this.autoSizeColumns(sheet);
    this.applyAlternatingRowColors(sheet);
    this.styleHeaderRow(sheet);
    this.applyAutoFilter(sheet);
  },

  /** @param {Worksheet} sheet */
  autoSizeColumns(sheet) {
    const columnWidths = [];
    sheet.eachRow((row) => {
      row.eachCell((cell, colNumber) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        // Add a small padding of 2 characters
        let cellLength = cellValue.length + 2;
        if (!columnWidths[colNumber] || cellLength > columnWidths[colNumber]) {
          columnWidths[colNumber] = cellLength;
        }
      });
    });

    columnWidths.forEach((width, colNumber) => {
      if (colNumber > 0 && width) {
        // Cap the column width at 50 characters
        sheet.getColumn(colNumber).width = Math.min(width, 50);
      }
    });
  },

  /** @param {Worksheet} sheet */
  styleHeaderRow(sheet) {
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    const greyFill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2E86AB" },
    };
    headerRow.eachCell((cell) => {
      cell.fill = greyFill;
    });
  },

  /** @param {Worksheet} sheet */
  _isApplicableToFormatting(sheet) {
    if (sheet.columnCount === 0 || sheet.rowCount < this.startRow) return false;
    return true;
  },

  /** @param {Worksheet} sheet */
  applyAlternatingRowColors(sheet) {
    if (!this._isApplicableToFormatting(sheet)) return;
    const topLeft = sheet.getCell(this.startRow, 1).address;
    const bottomRight = sheet.getCell(sheet.rowCount, sheet.columnCount).address;
    const ref = `${topLeft}:${bottomRight}`;

    sheet.addConditionalFormatting({
      ref,
      rules: [
        {
          type: "expression",
          formulae: ["MOD(ROW(),2)=0"],
          style: {
            fill: {
              type: "pattern",
              pattern: "solid",
              bgColor: { argb: "D6EAF8" },
            },
          },
        },
      ],
    });
  },

  /** @param {Worksheet} sheet */
  applyAutoFilter(sheet) {
    if (!this._isApplicableToFormatting(sheet)) return;
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: sheet.rowCount, column: sheet.columnCount },
    };
  },
};

export default tableStylings;
