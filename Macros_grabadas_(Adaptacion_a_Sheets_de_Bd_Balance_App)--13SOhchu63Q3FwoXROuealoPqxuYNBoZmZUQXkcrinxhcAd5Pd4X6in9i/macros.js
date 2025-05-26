//f 20/05 7y50
//f 20/05 8y13
//f 20/05 8y40
//f 20/05 8y52
//f 21/05 5:35
//f 21/05 6:12

//f 21/05 5:52
/** @OnlyCurrentDoc */

function AdaptacionbdBalanceapp() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('1:1').activate();
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Base'), true);
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('bd'), true);
  spreadsheet.getRange('A1').activate();
  spreadsheet.getRange('Base!A1:M1').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getRange('A1:M5272').activate();
  spreadsheet.getRange('A1:M5272').createFilter();
};

function dos() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D16').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('bd'), true);
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Base'), true);
  spreadsheet.getRange('1:1').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('bd'), true);
  spreadsheet.getRange('Base!1:1').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.getRange('B1:M1').activate();
  spreadsheet.getActiveRangeList().setBackground('#00ff00');
  spreadsheet.getRange('B:M').activate();
  spreadsheet.getActiveSheet().setColumnWidths(2, 12, 100);
  spreadsheet.getActiveSheet().autoResizeColumns(2, 12);
  spreadsheet.getRange('B1:M5272').activate();
  spreadsheet.getRange('B1:M5272').createFilter();
  spreadsheet.getRange('E:E').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('#,##0.00')
  .setNumberFormat('#,##0.0')
  .setNumberFormat('#,##0');
  spreadsheet.getRange('F1').activate();
  spreadsheet.getActiveSheet().setColumnWidth(2, 66);
  spreadsheet.getActiveSheet().setColumnWidth(4, 51);
  spreadsheet.getActiveSheet().setColumnWidth(7, 101);
  spreadsheet.getActiveSheet().setColumnWidth(8, 90);
  spreadsheet.getActiveSheet().setColumnWidth(9, 107);
  spreadsheet.getActiveSheet().setColumnWidth(10, 84);
  spreadsheet.getActiveSheet().setColumnWidth(11, 186);
  spreadsheet.getActiveSheet().setColumnWidth(12, 159);
  spreadsheet.getRange('E:E').activate();
  spreadsheet.getActiveRangeList().setBackground('#00ff00');
  spreadsheet.getRange('C:C').activate();
  spreadsheet.getActiveRangeList().setBackground('#00ff00');
  spreadsheet.getRange('1:1').activate();
  spreadsheet.setCurrentCell(spreadsheet.getRange('B1'));
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  spreadsheet.getActiveSheet().setColumnWidth(8, 97);
  spreadsheet.getActiveSheet().setColumnWidth(6, 278);
  spreadsheet.getActiveSheet().setColumnWidth(8, 108);
  spreadsheet.getActiveSheet().setColumnWidth(8, 117);
  spreadsheet.getActiveSheet().setColumnWidth(4, 68);
  spreadsheet.getRange('F:F').activate();
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
};