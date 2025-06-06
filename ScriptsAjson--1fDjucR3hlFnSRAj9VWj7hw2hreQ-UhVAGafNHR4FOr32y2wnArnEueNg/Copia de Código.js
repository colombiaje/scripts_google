function ScriptsAjson() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("json");
  const datos = hoja.getRange("F1:G" + hoja.getLastRow()).getValues();

  const scripts = datos
    .filter(fila => fila[0] && fila[1])
    .map(fila => ({ id: fila[0], nombre: fila[1] }));

  const jsonFinal = JSON.stringify({ scripts }, null, 2);

  const carpetaDestino = DriveApp.getFolderById("1v8V5VdBH90o94Ilu-nK3yPg8NgP0KOpa");
  const archivos = carpetaDestino.getFilesByName("scripts_exportados.json");

  // Borrar si ya existe
  while (archivos.hasNext()) {
    archivos.next().setTrashed(true);
  }

  // Crear nuevo archivo
  carpetaDestino.createFile("scripts_exportados.json", jsonFinal, MimeType.PLAIN_TEXT);
}
