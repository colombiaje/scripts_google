function listarMisScriptsYGuardarEnCarpeta() {
  const folderId = "1v8V5VdBH90o94Ilu-nK3yPg8NgP0KOpa"; // <- Reemplaza esto
  const carpetaDestino = DriveApp.getFolderById(folderId);

  const archivos = DriveApp.getFilesByType(MimeType.GOOGLE_APPS_SCRIPT);
  const scripts = [];

  while (archivos.hasNext()) {
    const archivo = archivos.next();
    scripts.push({
      nombre: archivo.getName(),
      id: archivo.getId()
    });
  }

  const contenidoJSON = JSON.stringify(scripts, null, 2); // bonito
  const nombreArchivo = "scripts_apps_script.json";

  const archivo = carpetaDestino.createFile(nombreArchivo, contenidoJSON, MimeType.PLAIN_TEXT);

  const enlace = "https://drive.google.com/file/d/" + archivo.getId() + "/view?usp=drivesdk";
  Logger.log("Archivo creado en carpeta: " + nombreArchivo);
  Logger.log("Enlace para ver/descargar: " + enlace);
}
