//26/05 18y33
/** @OnlyCurrentDoc */
function coloresperanza() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    SpreadsheetApp.getUi().alert("Error: No se encontró la hoja activa.");
    return;
  }

  var sheet = spreadsheet.getActiveSheet();
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: No hay ninguna hoja activa.");
    return;
  }

  var range = sheet.getActiveRange();
  if (!range) {
    SpreadsheetApp.getUi().alert("Error: No hay una celda seleccionada.");
    return;
  }

  range.setBackground('#00ffff'); // Aplica color cian
}

/**
 * Ejecuta la función sin activar la notificación de macro.
 */
function ejecutarElColoresperanza() {
  SpreadsheetApp.getUi(); // Línea vacía que evita la notificación
  coloresperanza();
}
