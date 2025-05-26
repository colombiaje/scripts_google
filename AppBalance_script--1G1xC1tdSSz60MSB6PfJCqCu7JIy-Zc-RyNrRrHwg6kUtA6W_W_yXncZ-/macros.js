function menuScriptings() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Menu Scriptings')
      .addItem('Antes de importar transacciones', 'antesDeimportarTransacciones')
      .addToUi();
}


function antesDeimportarTransacciones() {

  //Backup antes de importar

 var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D10').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('1 backup transacciones'), true);
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('A1').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('1 Transacciones'), true);
  spreadsheet.getRange('A1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.NEXT).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('1 backup transacciones'), true);
  spreadsheet.getRange('\'1 Transacciones\'!A1:M1018').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  
  //Limpiar hoja
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('C22').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('1 Transacciones'), true);
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('A1').activate();


  //Insertar 1 fila
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('1 Transacciones'), true);
  spreadsheet.getRange('1:1').activate();
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();

 //Ir a la hoja Bases a copiar
  var spreadsheet = SpreadsheetApp.getActive();
  //spreadsheet.getRange('G13').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('0 bases'), true);
  spreadsheet.getRange('C3:O3').activate();

   //Ir a la hoja Transacciones a pegar
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('C3:O3').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('1 Transacciones'), true);
  spreadsheet.getRange('A1').activate();
  spreadsheet.getRange('\'0 bases\'!C3:O3').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);


};



function m2() {
 
};