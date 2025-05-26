//foco lunes 05/19 12:13
function saldosInicialesSheetsBalance() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getRange('A1').activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion(SpreadsheetApp.Dimension.COLUMNS).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getRange('1:1').activate();
  //spreadsheet.getActiveSheet().deleteRows(spreadsheet.getActiveRange().getRow(), spreadsheet.getActiveRange().getNumRows());
  spreadsheet.getRange('G3').activate();
  currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getActiveRange().getDataRegion().activate();
  currentCell.activateAsCurrentCell();
  
  //na();
  //hora();
  
  saveAsSaldosIicialesCSV();
}

function saveAsSaldosIicialesCSV() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getSheetByName('2 1 Sheets Balance saldos iniciales');
  
  //Si se deseara crear una carpeta desde el nombre de la hoja de cálculo, asi:
  /*var folder = DriveApp.createFolder(ss.getName().toLowerCase().replace(/ /g,'_') +
                                     '_csv_' + new Date().getTime());*/
                                     
  //asigna la carpeta especifica a donde se quiere guardar                                   
  var folder = DriveApp.getFoldersByName("ArchivosCSV").next();

// agreguega la extensión ".csv" al nombre del archivo
  //fileName = sheet.getName() + ".csv";
  //fileName = "4_csv_saldosiniciales_balance.csv";
  
  fileName = "2 1 Sheets Balance saldos iniciales.csv";
    
  // convierte todos los datos de hoja disponibles a formato csv usando la funcion 
  // convertRangeToCsvFile_ cuyo algoritmo esta mas adelante
  
  var csvFile = convertRangeToCsvFile_(fileName, sheet);
  
  //crea un archivo en la Lista de documentos con el nombre y los datos csv
  var file = folder.createFile(fileName, csvFile);
  
  //Descarga de archivos
  var downloadURL = file.getDownloadUrl().slice(0, -8);
  showurl(downloadURL);
  
  var ui = SpreadsheetApp.getUi();
  ui.alert("Ok saldos iniciales csv en Sheets guardado");
    
}

function showurl(downloadURL) {
  
  try{
  n
  var app = UiApp.createApplication().setHeight('60').setWidth('150');
  
  // Cambia lo que dice la ventana emergente aquí
  app.setTitle("Tus saldos iniciales csv en Sheets  están listos!");
  var panel = app.createPopupPanel()
  
  // Cambia lo que dice el botón de descarga aquí
  var link = app.createAnchor('Haga click aquí para descargar', downloadURL);
  panel.add(link);
  app.add(panel);
  var doc = SpreadsheetApp.getActive();
  doc.show(app);
    
    }
  catch(err) {
    Logger.log(err);
   //Browser.msgBox(err);
  }
  }

function convertRangeToCsvFile_(csvFileName, sheet) {
  
  // obtener rango de datos disponible en la hoja de cálculo
  var activeRange = sheet.getDataRange();
  try {
    var data = activeRange.getValues();
    var csvFile = undefined;

  // recorre los datos en el rango y crea una cadena con los datos csv
    if (data.length > 1) {
      var csv = "";
      for (var row = 1; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
          if (data[row][col].toString().indexOf(",") != -1) {
            data[row][col] = "\"" + data[row][col] + "\"";
          }
        }

        // une las columnas de cada fila
        // agrega un retorno de carro al final de cada fila, excepto la última
        if (row < data.length-1) {
          csv += data[row].join(",") + "\r\n";
        }
        else {
          csv += data[row];
        }
      }
      csvFile = csv;
    }
    return csvFile;
  }
  catch(err) {
    Logger.log(err);
    Browser.msgBox(err);
  }
  
}

function na() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('J2').activate();
  spreadsheet.getCurrentCell().setValue('n a');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('M2').activate();
  spreadsheet.getCurrentCell().setValue('n a');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('N2').activate();
  spreadsheet.getCurrentCell().setValue('n a');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('P2').activate();
  spreadsheet.getCurrentCell().setValue('n a');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('Q2').activate();
  spreadsheet.getCurrentCell().setValue('n a');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
   
};

function hora() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('O2').activate();
  spreadsheet.getCurrentCell().setFormula('=RIGHT(NOW();8)');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
};
