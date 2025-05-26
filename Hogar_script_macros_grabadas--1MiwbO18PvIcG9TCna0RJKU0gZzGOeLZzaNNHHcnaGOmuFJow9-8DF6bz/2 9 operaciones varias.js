/** @OnlyCurrentDoc */



function Cambiardia() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E7').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getRange('C7').activate();
  spreadsheet.getRange('F7:F100').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  CopiarBalance;
  spreadsheet.getRange('d7:e100').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});

};

function Quincena() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('e28').activate();
  spreadsheet.getRange('u3:u9').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('e27').activate();
  spreadsheet.getRange('u2').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('d8').activate();
  spreadsheet.getRange('u16').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('d17').activate();
  spreadsheet.getRange('u17').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('e35').activate();
  spreadsheet.getRange('u11').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('e36').activate();
  spreadsheet.getRange('u12').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
};

function Sumar() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('e7').activate();
  spreadsheet.getCurrentCell().setFormula('SUM(d8:d100)');
  spreadsheet.getRange('d7').activate();
  spreadsheet.getCurrentCell().setFormula('SUM(e8:e100)');
  spreadsheet.getRange('d7:e7').activate();
  
};


function Limpiar() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('d7:e100').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('d7').activate();
};


function CopiarBalance() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('d7:e100').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('copia balance'), true);
  spreadsheet.getRange('Balance!d7:e100').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
};

function Balancea2_1_saldosIniciales() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A6:F53').activate();
  spreadsheet.getRange('A6:F53').createFilter();
  spreadsheet.getRange('C6').activate();
  var criteria = SpreadsheetApp.newFilterCriteria()
  .setHiddenValues(['0'])
  .build();
  spreadsheet.getActiveSheet().getFilter().setColumnFilterCriteria(3, criteria);
  spreadsheet.getRange('A7:C7').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2_1_saldosInicialesSheetsBalance'), true);
  spreadsheet.getRange('C2').activate();
  spreadsheet.getRange('Balance!A7:C51').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
};

function CEROS() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A2').activate();
  spreadsheet.getCurrentCell().setValue('0000');
  spreadsheet.getRange('A2:A31').activate();
  spreadsheet.getRange('A2').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
};

function valoresdeBalanceASaldosIniciales() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D16').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2_1_saldosInicialesSheetsBalance'), true);
  spreadsheet.getRange('2:9').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Balance'), true);
  spreadsheet.getRange('A7:C7').activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2_1_saldosInicialesSheetsBalance'), true);
  spreadsheet.getRange('C2').activate();
  spreadsheet.getRange('Balance!A7:C53').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Balance'), true);
  spreadsheet.getRange('G7:H7').activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('2_1_saldosInicialesSheetsBalance'), true);
  spreadsheet.getRange('J2').activate();
  spreadsheet.getRange('Balance!G7:H53').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
};