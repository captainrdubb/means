const ExcelExport = (data) => {
  Excel.run((ctx) => {
    const rows = data.length;
    const cols = data[0].length;
    const ws = ctx.workbook.worksheets.getActiveWorksheet();
    const dataRange = ws.getRangeByIndexes(0, 0, rows, cols);
    dataRange.values = data;
    dataRange.format.autofitColumns();
    return ctx.sync();
  }).catch((err) => {
    console.error(err);
  });
};

export default ExcelExport;
