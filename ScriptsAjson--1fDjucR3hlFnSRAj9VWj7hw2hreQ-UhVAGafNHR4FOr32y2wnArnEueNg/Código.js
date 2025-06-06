function ObtenerScriptsAjsonNuevo() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("json");

  // Leer desde F2 (evitando la fila de encabezado)
  const datos = hoja.getRange("H2:I" + hoja.getLastRow()).getValues();

  // Filtrar filas vacías y evitar encabezados por si acaso
  const scripts = datos
    .filter(fila =>
      fila[0] && fila[1] && fila[0].toString().toLowerCase() !== "id" && fila[1].toString().toLowerCase() !== "nombre"
    )
    .map(fila => ({ id: fila[0], nombre: fila[1] }));

  // Convertir a JSON con formato legible
  const jsonFinal = JSON.stringify(scripts, null, 2);

  // Carpeta de destino en Drive (asegúrate de tener acceso a este ID)
  const carpetaDestino = DriveApp.getFolderById("1v8V5VdBH90o94Ilu-nK3yPg8NgP0KOpa");

  // Buscar si ya existe un archivo con ese nombre
  const archivos = carpetaDestino.getFilesByName("scripts_config.json");

  // Eliminar archivos anteriores con el mismo nombre
  while (archivos.hasNext()) {
    archivos.next().setTrashed(true);
  }

  // Crear el nuevo archivo JSON|
  Logger.log("Nombre final del archivo: scripts_config.json");  
  Logger.log("Ruta carpeta: " + carpetaDestino.getName());

  carpetaDestino.createFile("scripts_config.json", jsonFinal, MimeType.PLAIN_TEXT);
}
