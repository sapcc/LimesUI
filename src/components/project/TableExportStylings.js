// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

const tableStylings = {
  applyAllStylings(sheet) {
    this.autoSizeColumns(sheet);
    this.applyAlternatingRowColors(sheet);
    this.styleHeaderRow(sheet);
  },

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

  applyAlternatingRowColors(sheet) {
    const blueFill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D6EAF8" },
    };

    const headerRow = sheet.getRow(1);
    const totalColumns = headerRow.cellCount;

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        for (let colNumber = 1; colNumber <= totalColumns; colNumber++) {
          const cell = row.getCell(colNumber);
          cell.fill = blueFill;
        }
      }
    });
  },
};

export default tableStylings;
